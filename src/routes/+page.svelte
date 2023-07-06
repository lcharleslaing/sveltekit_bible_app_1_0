<script>
    // @ts-nocheck

    import { onMount, afterUpdate } from "svelte";
    import { writable } from "svelte/store";
    import { debounce } from "lodash-es";
    import MyCard from "$lib/components/MyCard.svelte";

    let searchTerm = "";
    let searchInputHandler = debounce(
        (/** @type {string} */ value) => (searchTerm = value),
        200
    );
    /**
     * @type {string | any[]}
     */
    let data = [];
    /**
     * @type {string | any[]}
     */
    let displayData = [];

    onMount(async () => {
        try {
            const response = await fetch("/nkjv.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();
            displayData = data;

            let loadedScrollPosition = localStorage.getItem("scrollPosition");
            if (loadedScrollPosition !== null) {
                scrollPosition.set(parseInt(loadedScrollPosition, 10));
            }

            /**
             * @type {number | undefined}
             */
            let timer;
            window.addEventListener("scroll", () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    localStorage.setItem(
                        "scrollPosition",
                        window.scrollY.toString()
                    );
                }, 200);
            });
        } catch (e) {
            console.log("Error fetching data: " + e.message);
            // Handle your error here...
        }
    });

    $: {
        displayData = searchTerm
            ? data.filter((/** @type {{ text: string; }} */ item) =>
                  item.text.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : data;
    }

    const scrollPosition = writable(0);
    afterUpdate(() => {
        window.scrollTo(0, $scrollPosition);
    });
</script>

<MyCard site_name={true} custom_title="New King James Version" />

<div class="mx-4">
    {#if displayData.length === 0}
        <div
            class="flex flex-col items-center justify-center h-screen text-center space-y-4 p-4"
        >
            <h2 class="text-2xl font-bold text-gray-700">Loading...</h2>
        </div>
    {:else}
        {#each displayData as row, i}
            {#if i === 0 || row.book !== displayData[i - 1]?.book}
                <h2 class="card bg-primary p-4 shadow-xl text-white my-4">
                    {row.book}
                </h2>
            {/if}
            {#if i === 0 || row.chapter !== displayData[i - 1]?.chapter || row.book !== displayData[i - 1]?.book}
                <p class="my-4 font-extrabold italic">Chapter {row.chapter}</p>
            {/if}
            <div class="text-justify">
                <span class="text-xs mr-2 font-extrabold">{row.verse}</span>
                <span class="text-xl text-justify prose">{@html row.text}</span>
            </div>
        {/each}
    {/if}
</div>

<div class="sticky bottom-0 p-4 bg-white z-50">
    <input
        class="w-full px-3 py-2 border rounded-md"
        type="text"
        on:input={($event) => {
            //@ts-ignore
            searchInputHandler($event.target.value);
        }}
        placeholder="Search..."
    />
</div>
