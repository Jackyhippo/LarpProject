<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <swiper
          :space-between="30"
          :slides-per-view="3"
          :centered-slides="true"
          :keyboard="{
            enabled: true,
          }"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :effect="'coverflow'"
          :coverflow-effect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }"
          :loop="true"
          :grab-cursor="true"
          :navigation="false"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide>
            <img src="/public/不靠譜.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/public/創傷廢土.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/public/選戰2024.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/public/壽宴 1987.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/public/把愛吐進垃圾桶裡.png" alt="" />
          </swiper-slide>
        </swiper>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-0 mb-0">
      <v-col cols="12">
        <h1 class="text-center">劇本殺簡介</h1>
        <p class="text-center">
          ▋劇本殺是什麼？<br />
          劇本殺是一種「新世代社交推理解謎」遊戲。在遊玩時，每個玩家會像狼人殺一樣被分配到一個角色以及他的背景故事。<br />
          通常，故事中都會有一起主要兇案。玩家們要一邊扮演角色一邊利用線索推理，來還原真相，找出真兇。
        </p>
        <p class="text-center">
          ▋劇本殺要怎麼玩？<br />
          在玩劇本殺時，通常會有一位主持人帶領玩家們進行遊戲。每位玩家會選擇一個角色，然後拿到一份包含了角色故事和秘<br />
          密的劇本。閱讀完劇本後，大家開始扮演自己的角色，融入劇情中，而主持人會隨著遊戲進展發放線索卡。這些線索卡片<br />
          或許是秘密的關鍵，也有可能是找出真兇的線索。玩家必須善用這些線索，通過討論和推理，解開謎團，找出兇案的真相。
        </p>
        <p class="text-center">▋劇本殺三大特色 —— 推理、社交、換裝</p>
        <p class="text-center">
          推理<br />
          在遊戲中會出現大量的推理環節，你將有機會在曲折離奇的謎團中，逐步解開謎底，找到真相。對於喜歡偵探推理作品的<br />
          你，絕對是一個不容錯過的機會！
        </p>
        <p class="text-center">
          社交<br />
          劇本殺不僅能幫助陌生人快速變熟，還能夠讓老朋友之間相愛相殺，甚至在討論兇手時吵到大打出手。如果你是一個在狼人殺<br />
          只敢說一句「我是好人」就過麥的社恐，那也沒關係。因為在劇本殺中，你也能透過劇本的指引輕鬆地參與互動。
        </p>
        <p class="text-center">
          換裝<br />
          「換裝」是劇本殺的一大特色。在遊戲中，因為每位玩家都要扮演特定角色，所以很多店家會提供各種服裝選擇，包括古裝、<br />
          民國時期的服飾等等，以讓你更貼近你的角色。這不僅使遊戲更有趣，還提供了一個機會，讓你和朋友一起換上服裝，拍下精<br />
          彩的照片，然後在社交媒體上分享，打卡留念！
        </p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-0 mb-0">
      <v-col cols="12">
        <h1 class="text-center">遊玩介紹影片</h1>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <iframe
          width="600"
          height="300"
          src="https://www.youtube.com/embed/_C2r0s5zkjA?list=PLzJUGA7ZykJ0uEYZI7t-atj7v6Ntal5aS"
          title="阿啾小劇場-演戲成癮劇本殺｜集體中邪全記錄 feat. 鹿人與泥鰍小劇場 啾啾妹 辛卡拍咪啊"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <iframe
          width="600"
          height="300"
          src="https://www.youtube.com/embed/YBePFPrlYgg"
          title="【鹿人泥鰍劇場】超丟臉全記錄！集體中邪事件！ft. 阿啾小劇場 啾啾妹｜真實故事｜奇聞異事"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <iframe
          width="600"
          height="300"
          src="https://www.youtube.com/embed/lDriPqBPv50"
          title="【啾啾妹💕】LARP實境推理初體驗！鬼月花錢嚇自己@阿啾小劇場 @鹿人與泥鰍小劇場 @辛卡拍咪啊 ｜推理｜遊戲｜情境遊戲｜狼人殺｜分享｜插畫｜"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import { Navigation, EffectCoverflow, Autoplay, Keyboard } from 'swiper/modules'

const modules = [Navigation, EffectCoverflow, Autoplay, Keyboard]
</script>

<style scoped>
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 400px;
  height: auto;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: 'nav.home'
</route>
