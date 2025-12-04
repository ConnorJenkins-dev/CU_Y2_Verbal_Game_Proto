declare module '@vue-flow/core' {
	import { DefineComponent } from 'vue';

	export const VueFlow: DefineComponent<
		Record<string, unknown>,
		Record<string, unknown>,
		unknown
	>;
}
