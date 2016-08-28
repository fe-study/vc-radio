import Vue from 'vue'
import vcRadio from '../dist/build.js'

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
            status: 'success',
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
            this.status = 'warning' 
            this.disabled = false
            this.readonly = false
        },
        buttonFn () {
            this.button = true
            this.disabled = true
            this.readonly = true
            this.status = 'danger'
            this.disabled = false
            this.readonly = false
        },
        disabledFn () {
            this.readonly = false
            this.disabled = true
            this.status = 'primary'
        },
        readonlyFn () {
            this.disabled = false
            this.readonly = true
            this.status = 'info'
        }
    },
	components: {
        vcRadio
	}
})
