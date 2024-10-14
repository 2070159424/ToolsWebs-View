<script>
import {v1, v3, v4, v5, v6, v7} from "uuid";

export default {
	name: 'A7',
	data() {
		return {
			/** 生成个数 */
			count: 1,
			/** 选择生成版本。不同版本的特性。其中v1、v3、v5由于生成机制无法一次生成多个
			 * v1：
			 * 功能：生成基于时间戳和节点信息的 UUID（UUID v1）。无
			 * 参数：无
			 *
			 * v3：
			 * 功能：生成基于命名空间和名字的 UUID，使用 MD5 哈希（UUID v3）。根据命名空间和名字计算。
			 * 参数：命名空间（本质是一个UUID），名字
			 *
			 * v4：
			 * 功能：生成随机 UUID（UUID v4），通常是最常用的版本。
			 * 参数：无
			 * 可选参数：一个16个元素的，元素在0-255范围内的数组
			 *
			 * v5：
			 * 功能：生成基于命名空间和名字的 UUID，使用 SHA-1 哈希（UUID v5）。
			 * 参数：命名空间（本质是一个UUID），名字
			 *
			 * v6：
			 * 功能：生成基于时间戳的 UUID（UUID v6），比 v1 版本更适合在高并发的环境中使用。
			 * 参数：无
			 *
			 * v7：
			 * 功能：基于时间戳的随机 UUID（UUID v7），是最新的版本之一，旨在提供更好的唯一性。
			 * 参数：无
			 * */
			version: 'v4',
			name: '',
			namespace: ''
		}
	},
	methods: {
		createUUID() {
			switch (this.version) {
				case 'v1': {
					return v1()
				}
				case 'v3': {
					return v3(this.name, this.namespace)
				}
				case 'v4': {
					return v4()
				}
				case 'v5': {
					return v5(this.name, this.namespace)
				}
				case 'v6': {
					return v6()
				}
				case 'v7': {
					return v7()
				}
			}
		},
		/**
		 * 生成指定个数的UUID，通过浏览器接口crypto实现。
		 * */
		create() {
			document.getElementById('A7-container').innerHTML = ''
			if (this.version === 'v1' || this.version === 'v3' || this.version === 'v5') {
				this.count = 1
			}
			for (let i = 0; i < this.count; i++) {
				const element = document.createElement('span');
				element.innerText = this.createUUID() + '\n'
				document.getElementById('A7-container').appendChild(element)
			}
		},
		/** 实现下载功能，将数据下载到文本文件 */
		download() {
			const url = URL.createObjectURL(new Blob([document.getElementById('A7-container').innerText]));
			const a = document.createElement('a');
			a.href = url;
			a.download = new Date().getTime().toString();
			a.click()
			URL.revokeObjectURL(url)
		}
	}
}
</script>

<template>
	<el-container>
		<el-aside width="30%"/>
		<el-aside width="40%">
			<el-form label-width="auto">
				<el-form-item label="生成个数" v-if="version==='v4'||version==='v6'||version==='v7'">
					<el-input-number v-model="count" :min="1" :step="1" :step-strictly="true"/>&nbsp;
					<el-text size="small" type="warning">生成个数过多时，请稍等</el-text>
				</el-form-item>
				<el-form-item label="版本">
					<el-select v-model="version">
						<el-option label="v1（基于时间戳和节点信息）" value="v1"/>
						<el-option label="v3（基于命名空间和名字，MD5）" value="v3"/>
						<el-option label="v4（随机，推荐）" value="v4"/>
						<el-option label="v5（基于命名空间和名字，SHA-1）" value="v5"/>
						<el-option label="v6（基于v1的高并发版）" value="v6"/>
						<el-option label="v7（基于v1的最新版本）" value="v7"/>
					</el-select>
				</el-form-item>
				<el-form-item label="名称" v-if="version==='v3'||version==='v5'">
					<el-input v-model="name"/>
					<el-text size="small" type="warning">相同的名称和命名空间会生成一样的UUID</el-text>
				</el-form-item>
				<el-form-item label="命名空间" v-if="version==='v3'||version==='v5'">
					<el-input v-model="namespace"/>
					<el-text size="small" type="primary">命名空间本质上还是一个UUID<br>预设值（固定值）：<br>DNS：6ba7b810-9dad-11d1-80b4-00c04fd430c8<br>URL：6ba7b811-9dad-11d1-80b4-00c04fd430c8</el-text>
				</el-form-item>
				<el-form-item>
					<el-button @click="create" type="primary">生成</el-button>&nbsp;&nbsp;<el-button @click="download" type="success">下载</el-button>
				</el-form-item>
				<el-form-item>
					<div id="A7-container" style="line-height: normal;font-family: fangsong"></div>
				</el-form-item>
			</el-form>
		</el-aside>
		<el-aside width="30%"/>
	</el-container>
</template>

<style scoped>
</style>