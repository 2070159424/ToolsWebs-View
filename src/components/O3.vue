<script>
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
	name: 'O3',
	data() {
		return {
			ip: '',
			port: 0,
			result: ''
		}
	},
	methods: {
		connectPort() {
			if (this.ip === '') {
				ElMessage.warning('ip不能为空')
				return
			}
			if (!/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.ip)) {
				ElMessage.warning('请输入正确的ipv4地址')
				return
			}
			if (this.port === '') {
				ElMessage.warning('端口号不能为空')
			}
			axios.post(`/api/connectPort`, {
				ip: String(this.ip),
				port: parseInt(this.port)
			}).then((response) => {
				this.result = response.data
			})
		}
	}
}
</script>

<template>
	<div>
		<el-form label-width="auto" style="max-width: 600px;margin: 0 auto">
			<el-form-item label="ip">
				<el-input v-model="ip"></el-input>&nbsp;&nbsp;<el-text type="info">仅支持IPV4地址</el-text>
			</el-form-item>
			<el-form-item label="端口号">
				<el-input-number v-model="port" :min="0" :max="65535"></el-input-number>&nbsp;&nbsp;<el-text type="info">端口号范围：0-65535</el-text>
			</el-form-item>
			<div style="max-width: 600px;text-align: center">
				<el-button type="primary" @click="connectPort">测试</el-button>
				<br>
				<el-text>{{ result.message }}</el-text>
			</div>
		</el-form>
	</div>
</template>

<style scoped>

</style>