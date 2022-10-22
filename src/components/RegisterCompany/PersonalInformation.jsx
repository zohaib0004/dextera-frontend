/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Container from "@mui/material/Container";
import { CONFIG } from "../../api/MatterApi";

const PersonalInformation = ({ flag }) => {
	const { user } = useSelector((state) => state.auth.user);

	// const { isSubscribe } = useSelector((state) => state.isSubscribe);
	// const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		// personal Data relate to member
		first_name: user.profile.first_name,
		middle_name: "",
		last_name: user.profile.last_name,
		p_email: "",
		mobile: "",
		home: "",
		street: "",
		suite: "",
		city: "",
		state: "",
		zip: "",
		ext: "",
	});
	const {
		// personal Data relate to member
		first_name,
		middle_name,
		last_name,
		street,
		suite,
		city,
		state,
		zip,
		ext,
		mobile,
		home,
		p_email,
	} = userData;
	const onChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// we can put a flag for all set
	};
	useEffect(() => {
		if (flag) {
			const URL_PROFILE = `${process.env.REACT_APP_API_URL}/api/update-profile/${user.profile.id}/`;
			const personal_data = JSON.stringify({
				first_name,
				middle_name,
				last_name,
				p_email,
				home,
				mobile,
				street,
				suite,
				city,
				state,
				zip,
				ext,
			});
			axios
				.put(URL_PROFILE, personal_data, CONFIG)
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [flag]);
	return (
		<Fragment>
			<Box component='form' Validate mb={6} onSubmit={(e) => handleSubmit(e)}>
				<Container>
					<Grid
						container
						spacing={2}
						mt={2}
						mb={3}
						sx={{
							"& .MuiTextField-root": { m: 1, maxWidth: "17rem" },
						}}>
						<Grid item xs={12}>
							<Typography component='h3' variant='h5'>
								Business Owner Personal Information
							</Typography>

							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='first_name'
								value={first_name}
								label='First Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='first_name'
								autoComplete='first_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								value={middle_name}
								variant='outlined'
								name='middle_name'
								label='Middle Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='middle_name'
								autoComplete='middle_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='last_name'
								label='Last Name'
								value={last_name}
								type='text'
								onChange={(e) => onChange(e)}
								id='last_name'
								autoComplete='last_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='p_email'
								label='Personal Email Address'
								type='email'
								onChange={(e) => onChange(e)}
								id='p_email'
								autoComplete='p_email'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='home'
								label='Home #'
								type='phone'
								onChange={(e) => onChange(e)}
								id='home'
								autoComplete='home'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='mobile'
								label='Mobile #'
								type='phone'
								onChange={(e) => onChange(e)}
								id='mobile'
								autoComplete='mobile'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='street'
								label='Street'
								type='text'
								onChange={(e) => onChange(e)}
								id='street'
								autoComplete='street'
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='suite'
								label='Suite'
								type='text'
								onChange={(e) => onChange(e)}
								id='suite'
								autoComplete='suite'
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='city'
								label='City'
								type='text'
								onChange={(e) => onChange(e)}
								id='city'
								autoComplete='city'
								sx={{ width: "5rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='state'
								label='State'
								type='text'
								onChange={(e) => onChange(e)}
								id='state'
								autoComplete='state'
								sx={{ width: "5rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='zip'
								label='Zip'
								type='number'
								onChange={(e) => onChange(e)}
								id='zip'
								autoComplete='zip'
								sx={{ width: "4rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='ext'
								label='+4'
								type='number'
								onChange={(e) => onChange(e)}
								id='ext'
								autoComplete='ext'
								sx={{ width: "4rem" }}
							/>

							<Divider />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Fragment>
	);
};

export default PersonalInformation;
