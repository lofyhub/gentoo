<script setup lang="ts">
import Facebook from "@/components/icons/socials/Facebook.vue";
import Twitter from "@/components/icons/socials/Twitter.vue";
import Youtube from "@/components/icons/socials/Youtube.vue";
import Linkedin from "@/components/icons/socials/Linkedin.vue";
import LogoIcon from "./icons/LogoIcon.vue";
import Bleep from "@/components/icons/Bleep.vue";
import Phone from "@/components/icons/Phone.vue";
</script>

<template>
  <footer class="bg-white pt-20 pb-10 lg:pt-[120px] lg:pb-20">
    <div class="flex flex-wrap w-4/5 mx-auto">
      <div class="w-4/12 px-4">
        <div class="mb-10 w-full">
          <a href="/" class="mb-6 inline-block flex">
            <LogoIcon class="h-12 w-12" />
            <span class="text-2xl font-normal mt-3 ml-2">Kikao</span>
          </a>
          <ul>
            <li>
              <p class="text-body-color mb-7 text-base">
                Discover your perfect home from our wide selection of
                top-quality listings, complete with stunning high-resolution
                photos from locations nationwide (Kenya)
              </p>
            </li>
            <li>
              <p class="text-dark flex items-center text-sm font-medium">
                <span class="text-primary mr-3">
                  <Phone class="text-indigo-500" />
                </span>
                <span>+254-0778-537-497</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-1/5 px-4">
        <div class="mb-10 w-full">
          <h4 class="text-dark mb-9 text-2xl font-normal">Company</h4>
          <ul>
            <li>
              <a
                href="/about"
                class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
              >
                About Kikao
              </a>
            </li>
            <li>
              <a
                href="/contact"
                class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
              >
                Contact & Support
              </a>
            </li>
            <li>
              <a
                href="/faq"
                class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
              >
                FAQ's
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
              >
                Setting & Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-2/5 px-4">
        <div class="mb-10 w-full">
          <h4 class="text-dark mb-9 text-2xl font-normal">Follow Us On</h4>
          <div class="mb-6 flex items-center">
            <a
              href="https://twitter.com/kikaoHQ"
              target="_blank"
              rel="noopener noreferrer"
              class="text-dark hover:bg-indigo-50 hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
            >
              <Facebook />
            </a>
            <a
              href="https://twitter.com/kikaoHQ"
              target="_blank"
              rel="noopener noreferrer"
              class="text-dark hover:bg-indigo-50 hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
            >
              <Twitter />
            </a>
            <a
              href="https://twitter.com/kikaoHQ"
              target="_blank"
              rel="noopener noreferrer"
              class="text-dark hover:bg-indigo-50 hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
            >
              <Youtube />
            </a>
            <a
              href="https://twitter.com/kikaoHQ"
              target="_blank"
              rel="noopener noreferrer"
              class="text-dark hover:bg-indigo-50 hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
            >
              <Linkedin />
            </a>
          </div>
          <span class="flex inline pb-2">
            <span class="flex inline">Status</span>
            <Bleep class="mt-1 mx-2" />
            <span class="inline">All systems operational</span>
          </span>
          <p class="text-body-color text-base">&copy; 2023 Kikao</p>
        </div>
      </div>
    </div>
  </footer>
</template>
