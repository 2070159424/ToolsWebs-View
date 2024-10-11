<script>
import {fileTypeFromBlob} from "file-type";
import {ElMessage} from "element-plus";

export default {
	name: 'A6',
	mounted() {
		/** 常规转换操作 */
		document.getElementById('A6-upload-file').addEventListener('change', (event) => {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const a = document.createElement('a');
				const url = URL.createObjectURL(new Blob([e.target.result], {type: 'text/plain'}));
				a.href = url
				a.download = '[' + file.name + ']' + '-Base64.txt';
				a.click()
				URL.revokeObjectURL(url)
			}
			reader.readAsDataURL(file)
			event.target.value = ''
		})
		/** 使用file-type中的fileTypeFromBlob实现自动判断格式 */
		document.getElementById('A6-upload-base64').addEventListener('change', (event) => {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = async (e) => { // 因为fileTypeFromBlob为异步函数，需要等待执行完毕。因此onload也需要是异步函数才能等待执行完毕
				const base64 = e.target.result.split(',')[1].trim();
				let binaryString;
				try { // 判断是否为Base64编码
					binaryString = atob(base64);
				} catch (e) {
					ElMessage.warning('请上传正确的Base64编码的纯文本文件')
					return
				}
				const len = binaryString.length;
				const bytes = new Uint8Array(len);
				for (let i = 0; i < len; i++) {
					bytes[i] = binaryString.charCodeAt(i);
				}
				// 以上操作将Base64字符串转为Blob类型变量
				const file = new Blob([bytes]);
				let ext = ''; //获取格式
				await fileTypeFromBlob(file).then((result) => { //需要等待此函数执行完毕
					if (result === undefined) {
						ElMessage.warning('未知格式，请根据来源自行判断格式')
					} else {
						ext = result.ext
					}
				})
				const a = document.createElement('a');
				const url = URL.createObjectURL(file);
				a.href = url
				a.download = new Date().getTime().toString() + (ext === '' ? '' : '.' + ext) //后缀名不为空时自动拼接后缀
				a.click()
				URL.revokeObjectURL(url)
			}
			reader.readAsText(file)
			event.target.value = ''
		})
	}
}
</script>

<template>
	<el-container>
		<el-aside width="30%"/>
		<el-aside width="40%">
			<el-form label-width="auto">
				<el-form-item label="文件 => Base64">
					<input type="file" id="A6-upload-file">
					<el-text type="info" size="small">可上传任意文件</el-text>
				</el-form-item>
				<el-form-item label="Base64 => 文件">
					<input type="file" id="A6-upload-base64"/>
					<el-text type="info" size="small">上传只包含Base64字符串的纯文本文件</el-text>
				</el-form-item>
				<el-form>
					<el-alert type="info">上传文件后自动转换。注意文件过大时可能会转换失败</el-alert>
				</el-form>
			</el-form>
		</el-aside>
		<el-aside width="30%"/>
	</el-container>
</template>

<style scoped>

</style>