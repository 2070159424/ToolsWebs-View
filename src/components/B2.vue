<script>
import CryptoJS from "crypto-js";
import {ElMessage} from "element-plus";

export default {
	name: 'B2',
	data() {
		return {
			/** 编码前数据 */
			data: '',
			/** AES加密 */
			AES: {
				/** 密钥。需要固定长度16、24或32 */
				key: '',
				/** 偏移向量。需要固定长度16。默认为16个0。为空时采用默认值 */
				iv: '0000000000000000',
				/** 加密模式。默认为CBC */
				mode: 'CBC',
				/** 填充模式。默认为Pkcs7 */
				pad: 'Pkcs7',
				/** 总体编码模式。默认为Utf8 */
				encoding: 'Utf8',
				/** 加密结果 */
				result: ''
			}
		}
	},
	computed: {
		/** 选择编码方式 */
		AES_encoding() {
			switch (this.AES.encoding) {
				case "Hex": {
					return CryptoJS.enc.Hex
				}
				case "Latin1": {
					return CryptoJS.enc.Latin1
				}
				case "Utf8": {
					return CryptoJS.enc.Utf8
				}
				case "Utf16": {
					return CryptoJS.enc.Utf16
				}
				case "Utf16BE": {
					return CryptoJS.enc.Utf16BE
				}
				case "Utf16LE": {
					return CryptoJS.enc.Utf16LE
				}
				case "Base64": {
					return CryptoJS.enc.Base64
				}
				case "Base64url": {
					return CryptoJS.enc.Base64url
				}
			}
		},
	},
	methods: {
		/** 转换数据 */
		AES_data(data) {
			return this.AES_encoding.parse(data)
		},
		/** 转换密钥 */
		AES_key(key) {
			return this.AES_encoding.parse(key)
		},
		/** 转换偏移向量 */
		AES_iv(iv) {
			if (iv === '') {
				return this.AES_encoding.parse('0000000000000000')
			} else {
				return this.AES_encoding.parse(iv)
			}
		},
		/** 选择加密方式 */
		AES_mode(mode) {
			switch (mode) {
				case "CBC": {
					return CryptoJS.mode.CBC
				}
				case "CFB": {
					return CryptoJS.mode.CFB
				}
				case "CTR": {
					return CryptoJS.mode.CTR
				}
				case "CTRGladman": {
					return CryptoJS.mode.CTRGladman
				}
				case "OFB": {
					return CryptoJS.mode.OFB
				}
				case "ECB": {
					return CryptoJS.mode.ECB
				}
			}
		},
		/** 选择填充方式 */
		AES_pad(pad) {
			switch (pad) {
				case "Pkcs7": {
					return CryptoJS.pad.Pkcs7
				}
				case "AnsiX923": {
					return CryptoJS.pad.AnsiX923
				}
				case "Iso10126": {
					return CryptoJS.pad.Iso10126
				}
				case "Iso97971": {
					return CryptoJS.pad.Iso97971
				}
				case "ZeroPadding": {
					return CryptoJS.pad.ZeroPadding
				}
				case "NoPadding": {
					return CryptoJS.pad.NoPadding
				}
			}
		},
		/** 加密函数 */
		encodeAES() {
			if (this.data === '') {
				ElMessage.warning('数据不能为空')
				return
			}
			if (this.AES.key === '') {
				ElMessage.warning('密钥不能为空')
				return
			}
			if (!(this.AES.key.length === 16 || this.AES.key.length === 24 || this.AES.key.length === 32)) {
				ElMessage.warning('密钥长度不足')
				return
			}
			if (this.AES.iv.length !== 16) {
				ElMessage.warning('偏移向量长度不足')
			}
			console.log(this.data, this.AES)
			this.AES.result = CryptoJS.AES.encrypt(
				this.AES_data(this.data),
				this.AES_key(this.AES.key),
				{
					iv: this.AES_iv(this.AES.iv),
					mode: this.AES_mode(this.AES.mode),
					padding: this.AES_pad(this.AES.pad)
				}
			).toString()
		},
		/** 解密函数 */
		decodeAES() {
			if (this.data === '') {
				ElMessage.warning('数据不能为空')
				return
			}
			if (this.AES.key === '') {
				ElMessage.warning('密钥不能为空')
				return
			}
			if (!(this.AES.key.length === 16 || this.AES.key.length === 24 || this.AES.key.length === 32)) {
				ElMessage.warning('密钥长度不足')
				return
			}
			if (this.AES.iv.length !== 16) {
				ElMessage.warning('偏移向量长度不足')
			}
			this.AES.result = CryptoJS.AES.decrypt(
				this.data,
				this.AES_key(this.AES.key),
				{
					iv: this.AES_iv(this.AES.iv),
					mode: this.AES_mode(this.AES.mode),
					padding: this.AES_pad(this.AES.pad)
				}
			).toString(this.AES_encoding)
			if (this.AES.result === '') {
				ElMessage.warning('无法解密。原因：输入的数据不是加密的数据 或 参数错误')
			}
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
					<el-input type="textarea" :rows="10" placeholder="数据" v-model="data"/>
				</el-form-item>
				<el-tabs type="border-card">
					<el-tab-pane label="AES">
						<el-form-item label="密钥">
							<el-input v-model="AES.key"/>
							<el-text size="small" type="warning">必须为16、24或32位的任意字符</el-text>
						</el-form-item>
						<el-form-item label="偏移向量">
							<el-input v-model="AES.iv"/>
							<el-text size="small" type="warning">必须为16位的任意字符。默认为16个0</el-text>
						</el-form-item>
						<el-form-item label="编码">
							<el-select v-model="AES.encoding">
								<el-option label="Hex" value="Hex"/>
								<el-option label="Latin1" value="Latin1"/>
								<el-option label="Utf8" value="Utf8"/>
								<el-option label="Utf16" value="Utf16"/>
								<el-option label="Utf16BE" value="Utf16BE"/>
								<el-option label="Utf16LE" value="Utf16LE"/>
								<el-option label="Base64" value="Base64"/>
								<el-option label="Base64url" value="Base64url"/>
							</el-select>
						</el-form-item>
						<el-form-item label="加密方式">
							<el-select v-model="AES.mode">
								<el-option label="CBC" value="CBC"/>
								<el-option label="CFB" value="CFB"/>
								<el-option label="CTR" value="CTR"/>
								<el-option label="CTRGladman" value="CTRGladman"/>
								<el-option label="OFB" value="OFB"/>
								<el-option label="ECB" value="ECB"/>
							</el-select>
							<el-text size="small" type="warning">如果不明白此选项怎么选请保持默认CBC</el-text>
						</el-form-item>
						<el-form-item label="填充方式">
							<el-select v-model="AES.pad">
								<el-option label="Pkcs7" value="Pkcs7"/>
								<el-option label="AnsiX923" value="AnsiX923"/>
								<el-option label="Iso10126" value="Iso10126"/>
								<el-option label="Iso97971" value="Iso97971"/>
								<el-option label="ZeroPadding" value="ZeroPadding"/>
								<el-option label="NoPadding" value="NoPadding"/>
							</el-select>
							<el-text size="small" type="warning">如果不明白此选项怎么选请保持默认Pkcs7</el-text>
						</el-form-item>
						<el-form-item>
							<el-button @click="encodeAES" type="primary">加密</el-button>
							<el-button @click="decodeAES" type="warning">解密</el-button>
						</el-form-item>
						<el-form-item>
							<el-text style="word-break: break-all;font-family: fangsong">{{ AES.result }}</el-text>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-aside>
		<el-aside width="25%"/>
	</el-container>
</template>

<style scoped>
</style>