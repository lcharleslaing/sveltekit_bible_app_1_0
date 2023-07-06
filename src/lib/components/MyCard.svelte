<script>
    export let custom_title = "My Card";
    export let site_name = false;
</script>

<div class="mycard">
    {#if site_name}
        <h1 class="">{import.meta.env.VITE_APP_TITLE}</h1>
        <h2 class="">{custom_title}</h2>
    {/if}
    {#if !site_name}
        <h2 class="">{custom_title}</h2>
    {/if}
    <p class=""><slot /></p>
</div>
