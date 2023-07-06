<script>
    export let chapter = 1;
    export let verse = 1;
    /**
     * @type {any}
     */
    export let text;
</script>

<div class="mycard">
    <p
        class="italic text-center underline underline-offset-4 font-bold text-primary"
    >
        Chapter {chapter}
    </p>
    <p class="">
        <slot />
    </p>
</div>
