<template>
  <footer class="pb-3xlg pt-[2px]">
    <div class="container">
      <div class="bg-surface-action overflow-hidden rounded-card px-md py-xlg">

        <!-- ── Mobile / default: stacked ───────────────── -->
        <!-- ── Tablet (md): tagline top, then 2 cols ───── -->
        <!-- ── Desktop (lg): single row ────────────────── -->

        <div class="footer-inner flex flex-col gap-lg lg:flex-row lg:items-stretch">

          <!-- Left: tagline + copyright -->
          <div class="flex flex-col gap-lg justify-between shrink-0 lg:gap-0">
            <p class="footer-tagline font-secondary text-white">
              <!-- Desktop: line-breaks; tablet+mobile: flows naturally -->
              <span class="hidden lg:inline">We build products—<br />and the companies<br />behind them.</span>
              <span class="lg:hidden">We build products—and the companies behind them.</span>
            </p>
            <!-- Copyright: bottom of left col on desktop, after content on mobile/tablet -->
            <p class="text-body-md font-secondary text-white order-last lg:order-none">© Subvisual 2025</p>
          </div>

          <!-- Right: links + newsletter/logos -->
          <div class="flex-1 flex flex-col gap-lg md:flex-row md:items-stretch md:justify-between">

            <!-- Social + Legal columns -->
            <div class="flex items-start gap-sm shrink-0">

              <div class="flex flex-col gap-sm">
                <span class="text-body-md font-secondary text-white footer-label">Social</span>
                <a
                  v-for="link in socialLinks"
                  :key="link.label"
                  :href="link.href"
                  class="text-body-md font-secondary text-white hover:opacity-70 transition-opacity whitespace-nowrap"
                >{{ link.label }}</a>
              </div>

              <div class="flex flex-col gap-sm">
                <span class="text-body-md font-secondary text-white footer-label">Legal</span>
                <a
                  v-for="link in legalLinks"
                  :key="link.label"
                  :href="link.href"
                  class="text-body-md font-secondary text-white hover:opacity-70 transition-opacity whitespace-nowrap"
                >{{ link.label }}</a>
              </div>

            </div>

            <!-- Newsletter + logos -->
            <div class="flex flex-col gap-sm shrink-0 justify-between">

              <!-- Newsletter -->
              <div class="flex flex-col gap-sm">
                <p class="text-body-md font-secondary text-white" style="width: var(--footer-input-w)">
                  Get occasional notes from the team and the Sandbox Playbook.
                </p>
                <AppInput type="email" @submit="subscribe" submit-label="Subscribe" />
              </div>

              <!-- Partner logos -->
              <div class="partner-logos">
                <div
                  v-for="(row, r) in partnerLogoRows"
                  :key="r"
                  class="partner-logos__row"
                >
                  <img
                    v-for="logo in row"
                    :key="logo.alt"
                    :src="logo.src"
                    :alt="logo.alt"
                    :width="logo.w"
                    :height="logo.h"
                    class="shrink-0 object-contain"
                  />
                </div>
              </div><!-- /logos -->

            </div><!-- /newsletter + logos -->

          </div>

        </div>

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo1 from '~/assets/svg/footer-1.svg'
import logo2 from '~/assets/svg/footer-2.svg'
import logo3 from '~/assets/svg/footer-3.svg'
import logo4 from '~/assets/svg/footer-4.svg'
import logo5 from '~/assets/svg/footer-5.svg'
import logo6 from '~/assets/svg/footer-6.svg'
import logo7 from '~/assets/svg/footer-7.svg'

// Each row is an array of logo entries: { src, alt, w, h }
const partnerLogoRows = [
  [
    { src: logo7, alt: 'Compete 2020',                    w: 58,  h: 31 },
    { src: logo6, alt: 'Portugal 2030',                   w: 66,  h: 25 },
    { src: logo5, alt: 'Cofinanciado pela União Europeia', w: 114, h: 25 },
  ],
  [
    { src: logo4, alt: 'Norte 2020',    w: 122, h: 19 },
    { src: logo3, alt: 'Portugal 2020', w: 80,  h: 25 },
    { src: logo1, alt: 'União Europeia', w: 80,  h: 22 },
    { src: logo2, alt: 'União Europeia', w: 79,  h: 25 },
  ],
]

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

<style scoped>
/* h3 metrics without forcing the primary font-family */
.footer-tagline {
  font-size: var(--font-size-h3);
  line-height: var(--line-height-h3);
  letter-spacing: var(--letter-spacing-h3);
}
/* medium weight without being overridden by text-body-md */
.footer-label {
  font-weight: 500;
}
.footer-inner {
  gap: var(--footer-inner-gap, 6.25rem);
}
@media (max-width: 1439px) {
  .footer-inner {
    gap: var(--spacing-lg);
  }
}
.partner-logos {
  display: flex;
  flex-direction: column;
  gap: var(--footer-logo-gap);
}
.partner-logos__row {
  display: flex;
  align-items: center;
  gap: var(--footer-logo-gap);
}
</style>
