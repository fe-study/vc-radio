import Vue from 'vue'
import vcRadio from '../src'

new Vue({
	el: '#app',
	data () {
		return {
            bools: {
                'true': true,
                'false': false
            },
            label: '选择2',
            value: true,
            button: true,
            type: 'success',
            checked: true,
            disabled: false,
            readonly: false
		}
	},
    methods: {
        nativeFn () {
            this.button = false
            this.disabled = true
            this.readonly = true
            this.type = 'warning' 
            this.disabled = false
            this.readonly = false
        },
        buttonFn () {
            this.button = true
            this.disabled = true
            this.readonly = true
            this.type = 'danger'
            this.disabled = false
            this.readonly = false
        },
        disabledFn () {
            this.readonly = false
            this.disabled = true
            this.type = 'primary'
        },
        readonlyFn () {
            this.disabled = false
            this.readonly = true
            this.type = 'info'
        }
    },
	components: {
        vcRadio
	}
})
