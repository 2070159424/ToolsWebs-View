<script>
export default {
	name: 'A8',
	data() {
		return {
			/** 包含大写字母 */
			UpLetter: true,
			/** 包含小写字母 */
			lowLetter: true,
			/** 包含数字 */
			number: false,
			/** 包含特殊符号 */
			symbols: false,
			/** 随机字符串的长度 */
			length: 8,
			/** 生成的个数 */
			count: 1
		}
	},
	computed: {
		/** 随机生成字符串的序列 */
		randomString() {
			let randomString = ''
			if (this.UpLetter) {
				randomString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			}
			if (this.lowLetter) {
				randomString += 'abcdefghijklmnopqrstuvwxyz'
			}
			if (this.number) {
				randomString += '0123456789'
			}
			if (this.symbols) {
				randomString += "()`!@#$%^&*_-+=|{}[]:;'<>,.?"
			}
			return randomString
		}
	},
	methods: {
		/** 随机生成字符串 */
		RandomString() {
			let result = '';
			for (let i = 0; i < this.length; i++) {
				result += this.randomString.charAt(Math.floor(Math.random() * this.randomString.length))
			}
			return result
		},
		/** 调用生成方法并将数据添加到页面 */
		create() {
			document.getElementById('A8-container').innerHTML = ''
			for (let i = 0; i < this.count; i++) {
				const element = document.createElement('span');
				element.innerText = this.RandomString() + '\n'
				document.getElementById('A8-container').appendChild(element)
			}
		},
		/** 数据下载，将数据下载到文本文件 */
		download() {
			const url = URL.createObjectURL(new Blob([document.getElementById('A8-container').innerText]));
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
				<el-form-item label="生成选项">
					大写字母
					<el-switch v-model="UpLetter" size="small"/>&nbsp;&nbsp;
					小写字母
					<el-switch v-model="lowLetter" size="small"/>&nbsp;&nbsp;
					数字
					<el-switch v-model="number" size="small"/>&nbsp;&nbsp;
					特殊符号
					<el-switch v-model="symbols" size="small"/>
				</el-form-item>
				<el-form-item label="生成长度">
					<el-input-number v-model="length" :min="1" :step="1" :step-strictly="true"/>
				</el-form-item>
				<el-form-item label="生成个数">
					<el-input-number v-model="count" :min="1" :step="1" :step-strictly="true"></el-input-number>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="create">生成</el-button>&nbsp;&nbsp;<el-button type="success" @click="download">下载</el-button>
				</el-form-item>
				<el-form-item>
					<div id="A8-container" style="font-family: fangsong;line-height: normal;word-break: break-all"></div>
				</el-form-item>
			</el-form>
		</el-aside>
		<el-aside width="30%"/>
	</el-container>
</template>

<style scoped>
</style>