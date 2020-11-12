<template>
	<div class="field">
		<label v-if="label" class="label is-small">{{ label }}</label>
		<div class="control">
			<div class="select is-small is-fullwidth" v-if="type == 'select'">
				<select @change="$emit('update:value', $event.target.value)" v-model="selected">
					<option v-for="o in options" :key="o" :value="o">{{ o }}</option>
				</select>
			</div>

			<input
				v-else
				class="input is-small"
				type="text"
				:placeholder="placeholder"
				:value="value"
				@change="$emit('update:value', $event.target.value)"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: "Field",
	props: {
		label: String,
		placeholder: String,
		value: String,
		type: String,
		options: Array,
	},
	
	data: () => {
		return {
			selected: ""
		}
	},

	created: () => {
		this.selected = this.value;
	},

	watch: {
		value: (newVal) => {
			this.selected = newVal;
		}
	}
};
</script>

<style scoped>
</style>
