<script>
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
	name: 'A3',
	data() {
		return {
			/** 要测试的设备的IP */
			ip: '',
			/** 要测试的端口号*/
			port: 0,
			/** 结果 */
			result: ''
		}
	},
	methods: {
		/**
		 * 连通性请求，注意vite.config.js文件中的代理设置。
		 * */
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
	<el-container>
		<el-aside width="30%"/>
		<el-main>
			<el-form label-width="auto">
				<el-form-item label="ip">
					<el-input v-model="ip"/>
					<el-text type="info" size="small">仅支持IPV4地址</el-text>
				</el-form-item>
				<el-form-item label="端口号">
					<el-input-number v-model="port" :min="0" :max="65535"/>
					<el-text type="info" size="small">&nbsp;端口号范围：0-65535</el-text>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="connectPort" style="margin: 0 auto">测试</el-button>
				</el-form-item>
				<el-form-item>
					<el-result class="result" v-if="result.message==='开放'" icon="success"/>
					<el-result class="result" v-if="result.message==='关闭'" icon="warning"/>
				</el-form-item>
			</el-form>
		</el-main>
		<el-aside width="30%"/>
	</el-container>
</template>

<style scoped>
.result{
	margin: 0 auto;
}
.result * {
	width: 70%;
}
</style>