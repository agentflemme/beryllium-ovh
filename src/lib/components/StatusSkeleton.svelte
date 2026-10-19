<script>
  /**
   * Placeholder chrome for the status dashboard: mirrors the monitor list and
   * node-card grid so the layout does not jump when /api/status data lands.
   * Rendered immediately while the (potentially slow) telemetry fetch runs.
   */
</script>

<div class="space-y-10" aria-hidden="true">
  <!-- Monitors -->
  <div>
    <div class="skeleton mb-4 h-3 w-52 rounded"></div>
    <div class="panel mb-10 divide-y divide-edge/60">
      {#each [0, 1, 2] as row (row)}
        <div class="flex items-center justify-between gap-4 px-5 py-3.5">
          <div class="flex min-w-0 items-center gap-3">
            <div class="skeleton h-4 w-4 shrink-0 rounded-full"></div>
            <div class="min-w-0 space-y-2">
              <div class="skeleton h-3 w-36 rounded"></div>
              <div class="skeleton h-2 w-20 rounded"></div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="skeleton h-3 w-24 rounded"></div>
            <div class="skeleton h-5 w-16 rounded-full"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Node cards -->
  <div>
    <div class="skeleton mb-4 h-3 w-44 rounded"></div>
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {#each [0, 1, 2] as card (card)}
        <div class="panel p-5">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1 space-y-2">
              <div class="skeleton h-4 w-32 rounded"></div>
              <div class="skeleton h-2.5 w-24 rounded"></div>
            </div>
            <div class="skeleton h-5 w-16 rounded-full"></div>
          </div>

          <div class="mt-5 space-y-3.5">
            {#each [0, 1, 2] as metric (metric)}
              <div>
                <div class="mb-1.5 flex items-baseline justify-between">
                  <div class="skeleton h-2.5 w-14 rounded"></div>
                  <div class="skeleton h-3 w-10 rounded"></div>
                </div>
                <div class="skeleton h-1.5 w-full rounded-full"></div>
              </div>
            {/each}
          </div>

          <div class="mt-5 border-t border-edge/60 pt-4">
            <div class="skeleton mb-3 h-2.5 w-32 rounded"></div>
            <div class="grid grid-cols-2 gap-x-4 gap-y-2">
              <div class="skeleton h-3 w-full rounded"></div>
              <div class="skeleton h-3 w-3/4 rounded"></div>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between border-t border-edge/60 pt-3">
            <div class="skeleton h-2.5 w-20 rounded"></div>
            <div class="skeleton h-2.5 w-16 rounded"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>