<template>
  <div id="pagefooter">
    <h2>Stay in touch</h2>
    <div class="center">
      <img
        src="https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blt523d92af7120db77/5ce84a561e7d285a1128faf1/facebook.svg?auto=webp"
      />
      <img
        src="https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/bltce210d0f9e030de1/5d3639aa50ff330325978a6a/Twitter.svg?auto=webp"
      />
      <img
        src="https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blta54a13e6b93baa19/5ce84aaca3d61d8906c14250/instagram.svg?auto=webp"
      />
      <img
        src="https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blt0145e5d7222f9b66/5ce84ac9a408243c113cd043/youtube.svg?auto=webp"
      />
    </div>
    <div class="desc" @click="moveTo"><b-button class="backButton bg-transparent border-transparent">GO TO TOP</b-button></div>
  </div>
</template>

<style lang="sass" scoped>
#pagefooter
  background-image: url('https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blt4c0c222edcec84e7/5cea81d21457f05511424592/backgroundImagesposors.png?auto=webp')
  background-size: 100% 100%
  background-repeat: no-repeat
  padding: 15px
  background-color: rgb(51, 51, 51)
  background-size: auto 100%
  color: white
  display: flex
  flex-direction: row
  justify-content: space-between
  height: 171px
  width: 100%
  background-position: left center
  overflow: hidden
  font-weight: bold
  align-items: center
  margin-top: 40px
  h2
    font-size: 20px
  .center
    width: 330px
    display: flex
    justify-content: space-evenly
    img
      height: 30px
      width: 30px
  .desc
    box-sizing: border-box
    display: inline-block
    text-align: center
    width: 120px
    font-size: 14px
    min-height: 30px
    line-height: 30px
    color: white
    text-decoration: none
    border-style: solid
    border-width: 1px
    border-color: white
    height: fit-content
.backButton
  width: 100%
  border: none
  &:focus
    border: none !important
    outline: none !important
    box-shadow: none !important
</style>

<script>
export default {
  name: "PageFooter",
  methods: {
    moveTo() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>