<!-- Modal.svelte -->
<script>
    import { createEventDispatcher } from "svelte";
    import SearchInput from "./SearchInput.svelte";
    const dispatch = createEventDispatcher();

    let isOpen = false;

    const close = () => {
        isOpen = false;
    };

    const handleSearch = (/** @type {{ detail: any; }} */ event) => {
        // Dispatch event with the current search term
        dispatch("search", event.detail);
    };
</script>

{#if isOpen}
    <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
            <div class="bg-white p-4 rounded shadow-lg">
                <button on:click={close}>Close</button>
                <SearchInput on:search={handleSearch} />
            </div>
        </div>
    </div>
{/if}
