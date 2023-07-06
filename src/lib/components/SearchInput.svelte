<script>
    import { createEventDispatcher } from "svelte";
    let value = "";

    const dispatch = createEventDispatcher();

    // Invoking the input event
    const inputHandler = (
        /** @type {{ target: { value: string; }; }} */ event
    ) => {
        value = event.target.value;
        dispatch("input", value);
    };
</script>

<input
    class="w-full px-3 py-2 border rounded-md"
    type="text"
    bind:value
    on:input
/>
