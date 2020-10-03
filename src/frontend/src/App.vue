<template>
	<div id="app">
		<div v-if="ui.currentTab == 'mc_setup'">
			<div class="columns">
				<div class="column">
					<field
						label="Auth Base URI"
						type="text"
						placeholder="EG: https://abcde-fghij-klmnop.auth.marketingcloudapis.com/"
						:value.sync="config.mc_authurl"
					/>
				</div>

				<div class="column">
					<field
						label="MID"
						type="text"
						placeholder="EG: 123456"
						:value.sync="config.mc_mid"
					/>
				</div>
			</div>

			<div class="columns">
				<div class="column">
					<field
						label="Client ID"
						type="text"
						placeholder="EG: abcdefghijklmnop"
						:value.sync="config.mc_client_id"
					/>
				</div>

				<div class="column">
					<field
						label="Client Secret"
						type="text"
						placeholder="EG: abcdefghijklmnop"
						:value.sync="config.mc_client_secret"
					/>
				</div>
			</div>
		</div>

		<div v-else-if="ui.currentTab == 'is_setup'">
			<div class="columns">
				<div class="column">
					<field
						label="Account"
						type="text"
						placeholder="EG: abcdef"
						:value.sync="config.is_account"
					/>
				</div>
				<div class="column">
					<field
						label="Dataset"
						type="text"
						placeholder="EG: abcdef"
						:value.sync="config.is_dataset"
					/>
				</div>
			</div>

			<div class="columns">
				<div class="column">
					<field
						label="UserID field"
						type="select"
						placeholder="EG: abcdef"
						:value.sync="config.is_userid_field"
						:options="['SubscriberKey', 'Email']"
					/>
				</div>
				<div class="column">
					<field
						label="IS Token (optional)"
						type="text"
						placeholder="EG: abcdef"
						:value.sync="config.is_token"
					/>
				</div>
			</div>
		</div>

		<div v-else-if="ui.currentTab == 'mapping'">
			<textarea v-model="is_field_mapping" />
		</div>

		<button class="button is-primary is-small" @click="saveAndClose()">
			Save and close
		</button>
	</div>
</template>

<script>
import Postmonger from "postmonger";

import Field from "./components/Field.vue";

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
				is_action: "",
				is_custom_payload: "",

				mc_dataextension: "",
				mc_authurl: "",
				mc_mid: "",
				mc_client_id: "",
				mc_client_secret: "",
			},

			ui: {
				currentTab: "mc_setup",
				tabs: {
					mc_setup: { next: "is_setup" },
					is_setup: { next: "mapping", prev: "mc_setup" },
					mapping: { prev: "is_setup" },
				},
			},
		};
	},

	methods: {
		init: function (activity) {
			this.activity = activity;
			this.getArgumentValues(activity);
			console.log("INIT", this.activity);
		},

		saveAndClose: function () {
			if (this?.activity?.metaData === undefined) {
				return;
			}

			this.setArgumentValues();

			console.log(this.activity);

			this.activity.metaData.isConfigured = true;
			this.connection.trigger("updateActivity", this.activity);
			this.connection.trigger("requestInspectorClose");
		},

		getArgumentValues: function (activity) {
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

		setArgumentValues: function () {
			if (this?.activity?.arguments?.execute?.inArguments === undefined) {
				return;
			}

			for (let a of this?.activity?.arguments?.execute?.inArguments) {
				for (let prop in a) {
					if (this.config[prop]) {
						a[prop] = this.config[prop];
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

		this.connection.on("clickedNext", () => {
			this.ui.currentTab = this.ui.tabs[this.ui.currentTab].next || "mapping";
			this.connection.trigger("ready");
		});

		this.connection.on("clickedBack", () => {
			this.ui.currentTab = this.ui.tabs[this.ui.currentTab].prev || "mc_setup";
			this.connection.trigger("ready");
		});

		this.connection.on("gotoStep", (e) => {
			console.log(e);
			this.connection.trigger("ready");
		});

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
		Field,
	},
};
</script>

<style>
#app {
	padding: 10px;
}
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
