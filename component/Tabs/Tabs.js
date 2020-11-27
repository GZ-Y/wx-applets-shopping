// Component/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Tabs: {
      type: Array,
      value: []
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemChange(event) {
      const {
        index
      } = event.currentTarget.dataset;
      
      this.triggerEvent('itemChange',{index});
      
    }
  }
})