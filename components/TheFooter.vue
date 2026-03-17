<template>
  <footer class="pb-[120px] pt-[2px]">
    <div class="container">
      <div class="bg-surface-action rounded-[16px] px-8 py-[60px] flex items-stretch gap-[100px] overflow-hidden">

        <!-- ── Left: tagline + copyright ──────────────────────────────────── -->
        <div class="flex flex-col justify-between shrink-0">
          <p class="text-h3 font-secondary text-brand-white">
            We build products—<br />
            and the companies<br />
            behind them.
          </p>
          <p class="text-body-md font-secondary text-brand-white">© Subvisual 2025</p>
        </div>

        <!-- ── Content: links + newsletter/logos ──────────────────────────── -->
        <div class="flex-1 flex items-start justify-end gap-[116px]">

          <!-- Links: Social + Legal -->
          <div class="flex items-start gap-6 shrink-0">

            <div class="flex flex-col gap-6">
              <span class="text-body-md font-secondary text-brand-white font-medium">Social</span>
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.href"
                class="text-body-md font-secondary text-brand-white hover:opacity-70 transition-opacity whitespace-nowrap"
              >{{ link.label }}</a>
            </div>

            <div class="flex flex-col gap-6">
              <span class="text-body-md font-secondary text-brand-white font-medium">Legal</span>
              <a
                v-for="link in legalLinks"
                :key="link.label"
                :href="link.href"
                class="text-body-md font-secondary text-brand-white hover:opacity-70 transition-opacity whitespace-nowrap"
              >{{ link.label }}</a>
            </div>

          </div>

          <!-- Newsletter + Logos -->
          <div class="flex flex-col justify-between w-[438px] self-stretch shrink-0">

            <!-- Newsletter input -->
            <div class="flex flex-col gap-6">
              <p class="text-body-md font-secondary text-brand-white">
                Get occasional notes from the team and<br />
                the Sandbox Playbook.
              </p>
              <div class="bg-brand-white flex items-center pl-6 pr-[2px] py-[2px] rounded-full w-[311px]">
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  class="flex-1 min-w-0 text-body-md font-secondary text-text-body-primary bg-transparent outline-none placeholder:text-text-action-secondary"
                />
                <button
                  @click="subscribe"
                  aria-label="Subscribe"
                  class="bg-surface-action w-12 h-12 rounded-full flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
                >
                  <svg viewBox="0 0 20 20" class="w-5 h-5 fill-brand-white" aria-hidden="true">
                    <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Partner logos -->
            <div class="flex flex-col gap-[26px]">

              <!-- Row 1: Compete | Portugal 2030 | Cofinanciado EU -->
              <div class="flex items-center gap-[26px]">

                <!-- COMPETE -->
                <img
                  src="/logos/compete.svg"
                  alt="Compete 2020"
                  class="shrink-0"
                  style="width: 57px; height: 30px; object-fit: contain;"
                />

                <!-- Portugal 2030 (composed: shield + bar + text) -->
                <div class="relative shrink-0" style="width: 66px; height: 25px;">
                  <img src="/logos/pt2030-shield.svg" alt="" class="absolute"
                    style="left:0; top:0; width:18px; height:25px; object-fit:contain;" />
                  <img src="/logos/pt2030-bar.svg" alt="" class="absolute"
                    style="left:21px; top:0; width:33px; height:5px; object-fit:contain;" />
                  <img src="/logos/pt2030-text.svg" alt="Portugal 2030" class="absolute"
                    style="left:21px; top:8px; width:45px; height:16px; object-fit:contain;" />
                </div>

                <!-- Cofinanciado pela União Europeia (stars + text) -->
                <div class="relative shrink-0" style="width: 114px; height: 25px;">
                  <img src="/logos/eu-stars.svg" alt="" class="absolute"
                    style="left:0; top:0; width:37px; height:25px; object-fit:contain;" />
                  <img src="/logos/eu-cofinanciado.svg" alt="Cofinanciado pela União Europeia" class="absolute"
                    style="left:42px; top:3px; width:72px; height:18px; object-fit:contain;" />
                </div>

              </div>

              <!-- Row 2: Norte 2020 | Portugal 2020 | EU flag logo -->
              <div class="flex items-center gap-[26px]">

                <!-- NORTE 2020 -->
                <img
                  src="/logos/norte2020.svg"
                  alt="Norte 2020"
                  class="shrink-0"
                  style="width: 122px; height: 19px; object-fit: contain;"
                />

                <!-- Portugal 2020 -->
                <img
                  src="/logos/portugal2020.svg"
                  alt="Portugal 2020"
                  class="shrink-0"
                  style="width: 80px; height: 24px; object-fit: contain;"
                />

                <!-- EU flag logo -->
                <img
                  src="/logos/eu-flag-logo.svg"
                  alt="União Europeia"
                  class="shrink-0"
                  style="width: 80px; height: 22px; object-fit: contain;"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref('')

const socialLinks = [
  { label: 'Linkedin',    href: '#' },
  { label: 'Medium',      href: '#' },
  { label: 'X (Twitter)', href: '#' },
  { label: 'GitHub',      href: '#' },
  { label: 'Dribbble',    href: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy',  href: '#' },
  { label: 'Terms',          href: '#' },
]

function subscribe() {
  if (!email.value) return
  // TODO: wire up to newsletter service
  email.value = ''
}
</script>
