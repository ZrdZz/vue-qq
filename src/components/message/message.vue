<template>
  <div class="message">
    <ul>
       <!-- 这里的key以后改成id -->
      <li class="item border-1px" v-for="(item, index) in currentMessage" :key="index">
        <div class="icon">
          <img /> 
        </div>
        <div class="text">
          <h2 class="name"> {{item.name}} </h2>
          <!-- 这里判断是群组还是好友, 先假设全是好友 -->
          <span class="friendmessage"> {{item.friendmessage}} </span>
        </div>
        <div class="time">
          <span> {{item.time}} </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    // 假数据
    data() {
      return {
        currentMessage: [
          {
            name: '小张',
            friendmessage: '你在干嘛?',
            time: '昨天'
          },
          {
            name: '小网',
            friendmessage: '你在干嘛?',
            time: '昨天'
          },
          {
            name: '小白',
            friendmessage: '你在干嘛?',
            time: '昨天'
          }
        ]
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  
.message
  .item
    display: flex
    position: relative
    width: 100%
    height: 60px
    align-items: center
    border-1px($color-background-g)
    background: $color-background-w
    .icon
      width: 40px
      height: 40px
      margin-left: 10px
      background: blue
    .text
      margin-left: 10px
      .name
        font-size: $font-size-medium-x
        margin-bottom: 5px
      .friendmessage
        font-size: $font-size-medium
        color: $color-text-bl
    .time
      position: absolute
      top: 10px
      right: 10px
      font-size: $font-size-small
      color: $color-text-bl
</style>
