<template>
	<div id="app">
		<nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
			<ul>
				<li :class="ui.currentTab == 'mc_setup' ? 'is-active' : ''">
					<a @click="ui.currentTab = 'mc_setup'">MC Setup</a>
				</li>
				<li :class="ui.currentTab == 'is_setup' ? 'is-active' : ''">
					<a @click="ui.currentTab = 'is_setup'">IS Setup</a>
				</li>
				<li :class="ui.currentTab == 'mapping' ? 'is-active' : ''">
					<a @click="ui.currentTab = 'mapping'">Mapping</a>
				</li>
			</ul>
		</nav>

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
						label="IS Auth Token (optional)"
						type="text"
						placeholder="EG: abcdef"
						:value.sync="config.is_token"
					/>
				</div>
			</div>
		</div>

		<div v-else-if="ui.currentTab == 'mapping'">
			<div class="columns">
				<div class="column">
					<field
						label="IS Action"
						type="text"
						placeholder="EG: JB_Campaign"
						:value.sync="config.is_action"
					/>
				</div>

				<div class="column">
					<field
						label="MC Dataextension Key"
						type="text"
						placeholder="EG: My_IS_Dataextension"
						:value.sync="config.mc_dataextension"
					/>
				</div>
			</div>

			<div class="columns">
				<div class="column is-half">
					<div class="field has-addons">
						<div class="control is-expanded">
							<input
								class="input is-small"
								type="text"
								placeholder="Test IS UserID"
								v-model="testUserId"
							/>
						</div>
						<div class="control">
							<a class="button is-primary is-small">Get campaign response</a>
						</div>
					</div>
				</div>

				<div class="column is-one-fifth">
					<button class="button is-small is-primary is-fullwidth">
						Add column
					</button>
				</div>
				<div class="column">
					<div class="field">
						<div class="control">
							<div class="buttons has-addons is-fullwidth">
								<span class="button is-small is-static is-expanded"
									>Multiple records</span
								>

								<button
									:class="[
										config.mc_multirow ? 'is-selected  is-primary' : '',
										'button is-small',
									]"
									@click="config.mc_multirow = true"
								>
									yes
								</button>
								<button
									:class="[
										!config.mc_multirow ? 'is-selected  is-primary' : '',
										'button is-small',
									]"
									@click="config.mc_multirow = false"
								>
									no
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-5">
			<button class="button is-primary is-small" @click="saveAndClose()">
				Save and close
			</button>
		</div>
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

			testUserId: "",

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
				mc_multirow: false,
			},

			ui: {
				currentTab: "mc_setup",
				currentTabIndex: 0,

				steps: [
					{ label: "IS Setup", key: "is_setup", active: false },
					{ label: "MC Setup", key: "mc_setup", active: true },
					{ label: "Data Mapping", key: "mapping", active: false },
				],
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

		toggleCurrentTab: function (offset) {
			console.log(this.ui.steps);
			//this.ui.steps[this.ui.currentTabIndex].active = false;

			this.ui.currentTabIndex = Math.min(
				this.ui.steps.length - 1,
				Math.abs(this.ui.currentTabIndex + offset)
			);

			this.ui.steps[this.ui.currentTabIndex].active = true;
			this.ui.currentTab = this.ui.steps[this.ui.currentTabIndex].key;

			console.log(this.ui.steps);

			//this.connection.trigger("updateSteps", this.ui.steps);
			this.connection.trigger("ready");
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
			this.toggleCurrentTab(1);
			this.connection.trigger("nextStep");
		});

		this.connection.on("clickedBack", () => {
			this.toggleCurrentTab(-1);
			this.connection.trigger("prevStep");
		});

		this.connection.on("gotoStep", (e) => {
			console.log(e);
			this.connection.trigger("ready");
		});

		window.addEventListener('message', function(event) {
			console.log('Message received: ', event);
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
