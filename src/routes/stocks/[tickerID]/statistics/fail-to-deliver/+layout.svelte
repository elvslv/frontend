<script lang="ts">
  import { abbreviateNumber } from "$lib/utils";
  import ArrowLogo from "lucide-svelte/icons/move-up-right";

  export let data;
  const similarStocks = data?.getSimilarStocks?.sort(
    (a, b) => b?.relativeFTD - a?.relativeFTD,
  );
</script>

<section class="w-full overflow-hidden">
  <div class="w-full overflow-hidden m-auto">
    <div class="sm:p-0 flex justify-center w-full m-auto overflow-hidden">
      <div
        class="relative flex justify-center items-start overflow-hidden w-full"
      >
        <main class="w-full lg:w-3/4 lg:pr-10">
          <slot />
        </main>

        <aside class="hidden lg:block relative fixed w-1/4 mt-3">
          {#if similarStocks?.length > 0}
            <div
              class="w-full p-2 text-white border border-gray-600 bg-inherit rounded-md h-fit pb-4 mt-4 cursor-pointer"
            >
              <h3 class="p-2 pt-4 text-2xl font-semibold">Related Stocks</h3>
              <table class="table table-sm table-compact w-full text-white">
                <thead class="text-white"
                  ><tr
                    ><th
                      class="whitespace-nowrap border-b border-gray-600 font-semibold text-[1rem] text-left"
                      >Company</th
                    >
                    <th
                      class="whitespace-nowrap border-b border-gray-600 font-semibold text-[1rem] text-right"
                      >FTD / Avg Volume</th
                    ></tr
                  ></thead
                >
                <tbody>
                  {#each similarStocks?.slice(0, 8) as item, index}
                    {#if item?.relativeFTD > 0}
                      <tr
                        class="border-gray-800 text-[1rem] {index !==
                        similarStocks?.slice(0, 8).length - 1
                          ? 'border-b'
                          : ''}"
                        ><td class="text-left text-[1rem]"
                          ><a
                            href={`/stocks/${item?.symbol}`}
                            class="sm:hover:text-white text-blue-400"
                            >{item?.symbol}</a
                          ></td
                        >
                        <td class="text-right cursor-normal text-[1rem]"
                          >{item?.relativeFTD > 0.01
                            ? abbreviateNumber(item?.relativeFTD) + "%"
                            : "< 0.01%"}</td
                        >
                      </tr>
                    {/if}
                  {/each}
                </tbody>
              </table>
              <a
                href="/list/most-ftd-shares"
                class="flex justify-center items-center rounded cursor-pointer w-full py-2 mt-3 text-[1rem] text-center font-semibold text-black m-auto sm:hover:bg-gray-300 bg-[#fff] transition duration-100"
              >
                Fail-to-Deliver Ranks
              </a>
            </div>
          {/if}
        </aside>
      </div>
    </div>
  </div>
</section>
