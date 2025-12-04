import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default [
	{
		files: ['**/*.js', '**/*.ts', '**/*.vue'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node,
			},
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.vue'],
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			vue,
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...vue.configs['vue3-recommended'].rules,
			...tsPlugin.configs.recommended.rules,
		},
	},
];
