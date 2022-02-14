Component({
  properties: {
    empty:{
      type:Boolean,
      value:false,
      observer: function(newVal, oldVal) {
      }
    },
    loading: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
      }
    },
    complete:{
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
      }
    }
  }
});