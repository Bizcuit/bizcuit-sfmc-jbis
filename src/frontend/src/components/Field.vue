<template>
	<div class="field">
		<label v-if="label" class="label is-small">{{ label }}</label>
		<div class="control">
			<div class="select is-small is-fullwidth" v-if="type == 'select'">
				<select @change="$emit('update:value', $event.target.value)">
					<option v-for="o in options" :key="o" :value="o" :selected="o == value">{{ o }}</option>
				</select>
			</div>

			<input
				v-else-if="type == 'password'"
				class="input is-small"
				type="password"
				:placeholder="placeholder"
				:value="value"
				@change="$emit('update:value', $event.target.value)"
			/>

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
	}
};
</script>

<style scoped>
</style>
