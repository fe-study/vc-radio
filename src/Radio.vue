<template>
    <!-- thanks for https://github.com/yuche/vue-strap/blob/master/src/Radio.vue -->
    <div class="vc-radio-component" :class="{ 'group-item': group }">
        <label
            v-if="buttonStyle"
            :class="['btn', 'btn-' + typeColor, { 'active': active, 'disabled': disabled, 'readonly': readonly }]"
            @click.prevent="toggle"
        >
            <input type="radio" autocomplete="off"
                v-el:input
                v-show="!readonly"
                :name="name"
                :value="value"
                :checked="active"
                :disabled="disabled"
                :readonly="readonly"
            />
            <slot>{{ label }}</slot>
        </label>
        <div v-else
            :class="['radio', typeColor,{ 'active': active, 'disabled': disabled, 'readonly': readonly }]"
            @click.prevent="toggle"
        >
            <label class="open">
            <input type="radio" autocomplete="off"
                v-el:input
                :name="name"
                :value="value"
                :checked="active"
                :disabled="disabled"
                :readonly="readonly"
            />
            <span class="icon dropdown-toggle" :class="[ active ? 'btn-' + typeColor : '', { 'bg': typeColor === 'default' }]"></span>
            <span v-if="active && typeColor === 'default'" class="icon"></span>
            <span class="label-content"><slot>{{ label }}</slot></span>
            </label>
        </div>
    </div>
</template>

<style>
.vc-radio-component {
    display: inline-block;

    & .radio {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    &.group-item {
        float: left;
    }

    // 非group模式的重置margin
    .open {
        margin-right: 5px;
        height: 20px;
        line-height: 20px;
    }

    span.label-content {
        display: inline-block;
        position: relative;
        top: -1px;
        left: -3px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        vertical-align: baseline;
    }
}
.radio { position: relative; }
.radio > label > input {
    position: absolute;
    margin: 0;
    padding: 0;
    opacity: 0;
    z-index: -1;
    box-sizing: border-box;
}
.radio > label > .icon {
    position: absolute;
    top: 1.5px;
    left: 0;
    display: block;
    width: 14px;
    height: 14px;
    text-align: center;
    user-select: none;
    border-radius: 7px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
}
.radio:not(.active) > label > .icon {
    background-color: #ddd;
    border: 1px solid #bbb;
}
.radio > label > input:focus ~ .icon {
    outline: 0;
    // border: 1px solid #66afe9;
    /* box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6); */
}
.radio.active > label > .icon {
    background-size: 10px 10px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSI0IiBmaWxsPSIjZmZmIi8+PC9zdmc+);
}
.radio.active .btn-default { filter: brightness(75%); }
.radio.disabled > label > .icon,
.radio.readonly > label > .icon,
.btn.readonly {
    filter: alpha(opacity=65);
    box-shadow: none;
    opacity: .65;
}
label.btn > input[type=radio] {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
}
</style>

<script>
export default {
    name: 'vc-radio',
    props: {
        name: {
            type: String,
            default: null
        },
        label: String,
        type: {
            type: String,
            default: null
        },
        value: {
            default: true
        },
        checked: {
            twoWay: true
        },
        button: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    created () {
        // 设置相应的Radio模式
        const parent = this.$parent
        if (!parent) return
        if (parent._btnGroup && !parent._checkboxGroup) {
            parent._radioGroup = true
        }
    },
    ready () {
        if (!this.$parent._radioGroup) return

        if (this.$parent.value) {
            // 如果父组件有值，则checked相应值
            this.checked = (this.$parent.value === this.value)
        } else if (this.checked) {
            // 如果有checked，则设置父组件值
            this.$parent.value = this.value
        }
    },
    computed: {
        active () {
            return this.group ? this.$parent.value === this.value : this.value === this.checked
        },
        buttonStyle () {
            return this.button || (this.group && this.$parent.buttons)
        },
        group () {
            return this.$parent && this.$parent._radioGroup
        },
        typeColor () {
            return (this.type || (this.$parent && this.$parent.type)) || 'default'
        }
    },
    methods: {
        focus () {
            this.$els.input.focus()
        },
        toggle () {
            if (this.disabled) return
            this.focus()
            if (this.readonly) return
            this.checked = this.value
            if (this.group) {
                this.$parent.value = this.value
            }
        }
    }
}
</script>

