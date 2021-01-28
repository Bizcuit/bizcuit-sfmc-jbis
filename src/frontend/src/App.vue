<template>
	<div id="app">
		<h3 class="is-size-6 mt-5"><strong>Configuration:</strong></h3>

		<div v-if="ui.currentTab == 'is_setup'">
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
						label="IS Authentication Config (optional)"
						type="text"
						placeholder="EG: abcdef"
						:value.sync="config.is_token"
					/>
				</div>
			</div>

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
						label="IS Campaign Name"
						type="text"
						placeholder="EG: JBIS_CAMPAIGN"
						:value.sync="config.is_campaign"
					/>
				</div>
			</div>
		</div>

		<h3 class="is-size-6 mt-5"><strong>Output substitution strings:</strong></h3>

		<div class="tags mt-3">
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.segments}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.recommendations}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.experience}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.userGroup}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.attribute}}'"></span>
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
				is_action: "",
				is_campaign: "",
				is_custom_payload: "",
			},

			ui: {
				currentTab: "is_setup",
				currentTabIndex: 0,

				steps: [
					{ label: "IS Setup", key: "is_setup", active: false }
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
					if (this.config[prop] !== undefined) {
						a[prop] = this.config[prop];
					}
				}
			}
		},

		toggleCurrentTab: function (offset) {
			this.ui.currentTabIndex += offset;
			
			if(this.ui.currentTabIndex < 0) {
				this.ui.currentTabIndex = 0;
			}

			if(this.ui.currentTabIndex >= this.ui.steps.length){
				this.saveAndClose();
				return;
			}

			this.ui.currentTab = this.ui.steps[this.ui.currentTabIndex].key;
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
			this.ui.currentTab = e.key;
			this.ui.currentTabIndex = this.ui.steps.findIndex(s => s.key == e.key);
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
