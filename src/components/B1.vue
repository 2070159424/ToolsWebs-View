<script>
import {ElMessage} from "element-plus";

export default {
	name: 'B1',
	data() {
		return {
			textEncoder: new TextEncoder(),
			/** 待处理的数据 */
			data: '',
			/** 密钥 */
			secret: '',
			SHA1: '',
			SHA256: '',
			SHA384: '',
			SHA512: '',
			HMACSHA1: '',
			HMACSHA256: '',
			HMACSHA384: '',
			HMACSHA512: '',
		}
	},
	methods: {
		/** 根据指定算法计算SHA值
		 * @param sha {string} 使用的算法名
		 * */
		async computed(sha) {
			const uint8Array = this.textEncoder.encode(this.data);
			const arrayBuffer = await crypto.subtle.digest(sha, uint8Array);
			return Array.from(new Uint8Array(arrayBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
		},
		async computedHMAC(key, sha) {
			const encodeKey = this.textEncoder.encode(key);
			const encodeData = this.textEncoder.encode(this.data);
			const cryptoKey = await crypto.subtle.importKey(
				"raw",
				encodeKey,
				{name: 'HMAC', hash: {name: sha}},
				false,
				['sign']
			);
			const arrayBuffer = await crypto.subtle.sign('HMAC', cryptoKey, encodeData);
			return Array.from(new Uint8Array(arrayBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
		}
	},
	watch: {//通过监听数据变化实时更改数据
		data() {
			this.computed('SHA-1').then((response) => {
				this.SHA1 = response
			});
			this.computed('SHA-256').then((response) => {
				this.SHA256 = response
			});
			this.computed('SHA-384').then((response) => {
				this.SHA384 = response
			});
			this.computed('SHA-512').then((response) => {
				this.SHA512 = response
			});
			if (this.secret !== '') {
				this.computedHMAC(this.secret, 'SHA-1').then((response) => {
					this.HMACSHA1 = response
				})
				this.computedHMAC(this.secret, 'SHA-256').then((response) => {
					this.HMACSHA256 = response
				})
				this.computedHMAC(this.secret, 'SHA-384').then((response) => {
					this.HMACSHA384 = response
				})
				this.computedHMAC(this.secret, 'SHA-512').then((response) => {
					this.HMACSHA512 = response
				})
			}
		},
		secret() {
			if (this.secret === '') {
				ElMessage.warning('密钥不能为空')
				return
			}
			this.computedHMAC(this.secret, 'SHA-1').then((response) => {
				this.HMACSHA1 = response
			})
			this.computedHMAC(this.secret, 'SHA-256').then((response) => {
				this.HMACSHA256 = response
			})
			this.computedHMAC(this.secret, 'SHA-384').then((response) => {
				this.HMACSHA384 = response
			})
			this.computedHMAC(this.secret, 'SHA-512').then((response) => {
				this.HMACSHA512 = response
			})
		}
	}
}
</script>

<template>
	<el-container>
		<el-aside width="30%"/>
		<el-aside width="40%">
			<el-form label-width="auto">
				<el-form-item>
					<el-input type="textarea" :rows="10" v-model="data"/>
				</el-form-item>
				<el-tabs type="border-card">
					<el-tab-pane label="哈希计算">
						<div style="font-family: fangsong;word-break: break-all">
							<el-form-item label="SHA1">{{ SHA1 }}</el-form-item>
							<el-form-item label="SHA256">{{ SHA256 }}</el-form-item>
							<el-form-item label="SHA384">{{ SHA384 }}</el-form-item>
							<el-form-item label="SHA512">{{ SHA512 }}</el-form-item>
						</div>
					</el-tab-pane>
					<el-tab-pane label="HMAC哈希计算">
						<el-form-item label="密钥">
							<el-input v-model="secret"/>
							<el-text type="info" size="small">仅对HMAC计算生效</el-text>
						</el-form-item>
						<div style="font-family: fangsong;word-break: break-all">
							<el-form-item label="HMACSHA1">{{ HMACSHA1 }}</el-form-item>
							<el-form-item label="HMACSHA256">{{ HMACSHA256 }}</el-form-item>
							<el-form-item label="HMACSHA384">{{ HMACSHA384 }}</el-form-item>
							<el-form-item label="HMACSHA512">{{ HMACSHA512 }}</el-form-item>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-aside>
		<el-aside width="30%"/>
	</el-container>
</template>

<style scoped>
</style>