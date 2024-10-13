<script>
import CryptoJS from "crypto-js";

export default {
	name: 'B1',
	data() {
		return {
			data: 'Hello, CryptoJS',
			key: ''
		}
	},
	computed: {
		MD5() {
			return CryptoJS.MD5(this.data)
		},
		SHA1() {
			return CryptoJS.SHA1(this.data)
		},
		SHA224() {
			return CryptoJS.SHA224(this.data)
		},
		SHA256() {
			return CryptoJS.SHA256(this.data)
		},
		SHA384() {
			return CryptoJS.SHA384(this.data)
		},
		SHA512() {
			return CryptoJS.SHA512(this.data)
		},
		SHA3() {
			return CryptoJS.SHA3(this.data)
		},
		RIPEMD160() {
			return CryptoJS.RIPEMD160(this.data)
		},
		HmacMD5() {
			if (this.key) return CryptoJS.HmacMD5(this.data, this.key)
		},
		HmacSHA1() {
			if (this.key) return CryptoJS.HmacSHA1(this.data, this.key);
		},
		HmacSHA224() {
			if (this.key) return CryptoJS.HmacSHA224(this.data, this.key);
		},
		HmacSHA256() {
			if (this.key) return CryptoJS.HmacSHA256(this.data, this.key);
		},
		HmacSHA384() {
			if (this.key) return CryptoJS.HmacSHA384(this.data, this.key);
		},
		HmacSHA512() {
			if (this.key) return CryptoJS.HmacSHA512(this.data, this.key);
		},
		HmacSHA3() {
			if (this.key) return CryptoJS.HmacSHA3(this.data, this.key);
		},
		HmacRIPEMD160() {
			if (this.key) return CryptoJS.HmacRIPEMD160(this.data, this.key);
		}
	}
}
</script>

<template>
	<el-container>
		<el-aside width="25%"/>
		<el-aside width="50%">
			<el-form label-width="auto">
				<el-form-item>
					<el-input type="textarea" :rows="10" v-model="data" placeholder="请输入数据"/>
				</el-form-item>
				<el-tabs type="border-card" style="word-break: break-all">
					<el-tab-pane label="哈希计算">
						<el-form-item label="MD5">{{ MD5 }}</el-form-item>
						<el-form-item label="SHA1">{{ SHA1 }}</el-form-item>
						<el-form-item label="SHA224">{{ SHA224 }}</el-form-item>
						<el-form-item label="SHA256">{{ SHA256 }}</el-form-item>
						<el-form-item label="SHA384">{{ SHA384 }}</el-form-item>
						<el-form-item label="SHA512">{{ SHA512 }}</el-form-item>
						<el-form-item label="SHA3">{{ SHA3 }}</el-form-item>
						<el-form-item label="RIPEMD160">{{ RIPEMD160 }}</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="Hmac哈希计算">
						<el-form-item label="密钥">
							<el-input v-model="key"/>
						</el-form-item>
						<el-form-item label="HmacMD5">{{ HmacMD5 }}</el-form-item>
						<el-form-item label="HmacSHA1">{{ HmacSHA1 }}</el-form-item>
						<el-form-item label="HmacSHA224">{{ HmacSHA224 }}</el-form-item>
						<el-form-item label="HmacSHA256">{{ HmacSHA256 }}</el-form-item>
						<el-form-item label="HmacSHA384">{{ HmacSHA384 }}</el-form-item>
						<el-form-item label="HmacSHA512">{{ HmacSHA512 }}</el-form-item>
						<el-form-item label="HmacSHA3">{{ HmacSHA3 }}</el-form-item>
						<el-form-item label="HmacRIPEMD160">{{ HmacRIPEMD160 }}</el-form-item>
					</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-aside>
		<el-aside width="25%"/>
	</el-container>
</template>

<style scoped>
</style>