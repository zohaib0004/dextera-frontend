/** @format */

import React, { useState, useEffect, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import AdminDashboard from "../components/Dashboard/UserRoles/AdminDashboard";
import ClientDashboard from "../components/Dashboard/UserRoles/ClientDashboard";
import LawyerDashboard from "../components/Dashboard/UserRoles/LawyerDashboard";
import FirmDashboard from "../components/Dashboard/UserRoles/FirmDashboard";
import axios from "axios";
import RegisterCompany from "../components/RegisterCompany/RegisterCompany";
import {
	setSubscription,
	unSetSubscription,
} from "../redux/features/subscriptionSlice";

const Dashboard = () => {
	const { user } = useSelector((state) => state.auth.user);
	const { isSubscribe } = useSelector((state) => state.isSubscribe);
	const { isFirm, setIsFirm } = useState(false);
	const dispatch = useDispatch();
	// fetch firm account

	useEffect(() => {
		if (user.is_firm) {
			axios
				.get(
					`${process.env.REACT_APP_API_URL}/api/is-subscription/?user=${user.id}`,
				)
				.then((response) => {
					console.log("🚀 ~ file: Home.js ~ line 32 ~ .then ~ response", response)
					if (response.data[0].is_active) {
						dispatch(setSubscription());
					} else {
						dispatch(unSetSubscription());
					}
					return response.data;
				});
		}
	}, [user.is_firm]);
	const dashboardRedirect = () => {
		if (user.is_superuser) {
			return <AdminDashboard />;
		} else if (user.is_firm) {
			if (isSubscribe) {
				return <FirmDashboard />;
			} else {
				return <RegisterCompany />;
			}
		} else if (user.is_firm_employee) {
			return <LawyerDashboard />;
		} else if (user.is_client) {
			return <ClientDashboard />;
		}
	};
	return <>{dashboardRedirect()}</>;
};

export default Dashboard;
