<template>
	<div id="app">
		<Config msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
import Postmonger from "postmonger";

import Config from "./components/Config.vue";

export default {
	name: "App",

	data: () => {
		return {
			connection: null,
		};
	},

	methods: {
		init: function (data) {
			console.log("INIT", data);
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
		*/
	},

	components: {
		Config,
	},
};
</script>

<style>
</style>
