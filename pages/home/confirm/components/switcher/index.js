Component({
  properties: {
    checked: {
      type: Boolean,
      value: false,
      observer(newVal) {
        this.setData({ value: newVal })
      }
    }
  },
  data: {
    value: false
  },
  methods: {
    isChecked() {
      let { value } = this.data
      value = !value
      this.setData({ value })
      this.triggerEvent('change', value)
    }
  }
})
