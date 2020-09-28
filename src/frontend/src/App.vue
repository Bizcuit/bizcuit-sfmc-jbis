<template>
	<div id="app">
		<h5>is_account</h5>
		<input
			type="text"
			:value="config.is_account"
			@change="sendArgumentValue('is_account', $event.target.value)"
		/>

		<h5>is_dataset</h5>
		<input
			type="text"
			:value="config.is_dataset"
			@change="sendArgumentValue('is_dataset', $event.target.value)"
		/>

		<h5>is_token</h5>
		<input
			type="text"
			:value="config.is_token"
			@change="sendArgumentValue('is_token', $event.target.value)"
		/>

		<h5>is_userid_field</h5>
		<input
			type="text"
			:value="config.is_userid_field"
			@change="sendArgumentValue('is_userid_field', $event.target.value)"
		/>

		<h5>is_field_mapping</h5>
		<input
			type="text"
			:value="config.is_field_mapping"
			@change="sendArgumentValue('is_field_mapping', $event.target.value)"
		/>

		<button @click="saveAndClose()">Save</button>
	</div>
</template>

<script>
import Postmonger from "postmonger";

//import Config from "./components/Config.vue";

export default {
	name: "App",

	data: () => {
		return {
			connection: null,
			activity: null,

			config: {
				is_account: "",
				is_dataset: "",
				is_token: "",
				is_userid_field: "",
				is_field_mapping: "",
			},
		};
	},

	methods: {
		init: function (activity) {
			this.activity = activity;
			this.getArgumentValuesFromActivity(activity);
			console.log("INIT", activity);
		},

		saveAndClose: function () {
			console.log(this.activity);
			this.connection.trigger("updateActivity", this.activity);
			this.connection.trigger("requestInspectorClose");
		},

		getArgumentValuesFromActivity: function (activity) {
			if (activity?.arguments?.execute?.inArguments === undefined) {
				return;
			}

			for (let a of activity?.arguments?.execute?.inArguments) {
				for (let prop in a) {
					if (this.config[prop] !== undefined) {
						this.config[prop] = a[prop];
					}
				}
			}
		},

		sendArgumentValue: function (argument, value) {
			if (this?.activity?.arguments?.execute?.inArguments === undefined) {
				return;
			}

			for (let a of this?.activity?.arguments?.execute?.inArguments) {
				for (let prop in a) {
					if (prop === argument) {
						a[prop] = value;
						return;
					}
				}
			}
		},

		log: function (data) {
			console.log("LOG", data);
		},
	},

	mounted: function () {
		this.connection = new Postmonger.Session();

		this.connection.on("initActivity", this.init);
		this.connection.on("requestedTokens", this.log);
		this.connection.on("requestEndpoints", this.log);

		this.connection.trigger("ready");
		this.connection.trigger("requestTokens");
		this.connection.trigger("requestEndpoints");
		/*
		connection.on('initActivity', onInitActivity);
		connection.trigger('ready');
		connection.trigger('updateActivity', activity);
		connection.trigger('setActivityDirtyState', false);
		connection.trigger('requestInspectorClose');
		connection.on("requestedTokens", onGetTokens);
		connection.on("requestedEndpoints", onGetEndpoints);

		connection.on("clickedNext", onClickedNext);
		connection.on("clickedBack", onClickedBack);
		connection.on("gotoStep", onGotoStep);
		connection.trigger("ready");

		connection.trigger("requestTokens");
		connection.trigger("requestEndpoints");
		connection.trigger("updateButton", {
			button: "next",
			enabled: Boolean(message),
		});
		connection.trigger("updateSteps", steps);

		{{Contact.Key}}
		*/
	},

	components: {
		//Config,
	},
};
</script>

<style>
h5 {
	padding: 10px 0px 5px 0px;
	margin: 0px;
}
input {
	width: 100%;
	padding: 3px;
	box-sizing: border-box;
}
</style>
