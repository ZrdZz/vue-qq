<template>
  <div class="citypicker">
    <p @click="show" ref="city"> 选择城市 </p>
    <picker @select="handleSelect(arguments)" :data="data" 
            :selected-index="selectedIndex" ref="picker" :title="title" 
            @change="handleChange" :cancelTxt="cancelTxt" :confirmTxt="confirmTxt"></picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import Picker from 'base/picker/picker'
  import {provinceList, cityList, areaList} from 'components/citypicker/data'

  export default {
    name: 'city-picker',
    data() {
      return {
        tempIndex: [0, 0, 0],
        title: '所在地',
        selectedIndex: [0, 0, 0],
        cancelTxt: '取消',
        confirmTxt: '确定'
      }
    },
    props: {
      fromDBCity: {
        type: String,
        default: ''
      }
    },
    computed: {
      data() {
        const provinces = provinceList
        const cities = cityList[provinces[this.tempIndex[0]].value]
        const areas = areaList[cities[this.tempIndex[1]].value]
        return [provinces, cities, areas]
      }
    },
    watch: {
      data() {
        this.$refs.picker.refresh()
      },
      fromDBCity() {
        this.$refs.city.innerHTML = this.fromDBCity
      }
    },
    components: {
      Picker
    },
    methods: {
      show() {
        this.$refs.picker.setData(this.data)
        this.$refs.picker.show()
      },
      handleSelect(args) {
        let city = args[2]
        if (city[0] === city[1]) {
          city.splice(0, 1)
        }
        city = city.join('/')
        this.$refs.city.innerHTML = city
        this.$emit('selectCity', city)
      },
      handleChange(i, newIndex) {
        if (newIndex !== this.tempIndex[i]) {
          for (let j = 2; j > i; j--) {
            this.tempIndex.splice(j, 1, 0)
            this.$refs.picker.scrollTo(j, 0)
          }
          this.tempIndex.splice(i, 1, newIndex)
        }
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .citypicker
    display: inline-block
</style>
