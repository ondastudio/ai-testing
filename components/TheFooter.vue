<template>
  <footer class="pb-3xlg pt-[2px]">
    <div class="container">
      <div class="bg-surface-action px-8 py-xlg flex items-stretch overflow-hidden" style="border-radius: var(--border-radius-card); gap: var(--footer-inner-gap)">

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
        <div class="flex-1 flex items-start justify-end" style="gap: var(--footer-links-gap)">

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
          <div class="flex flex-col justify-between self-stretch shrink-0" style="width: var(--footer-newsletter-w)">

            <!-- Newsletter input -->
            <div class="flex flex-col gap-6">
              <p class="text-body-md font-secondary text-brand-white">
                Get occasional notes from the team and<br />
                the Sandbox Playbook.
              </p>
              <AppInput type="email" @submit="subscribe" submit-label="Subscribe" />
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

function subscribe(_email: string) {
  // TODO: wire up to newsletter service
}
</script>
