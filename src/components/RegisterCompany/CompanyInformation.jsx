/** @format */

import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useToggle } from "../../context/useToggle";
import { CONFIG } from "../../api/MatterApi";

const CompanyInformation = () => {
	const { user } = useSelector((state) => state.auth.user);
	const { isSubscribe } = useSelector((state) => state.isSubscribe);
	const [isAddressSame, setIsAddressSame] = useToggle(false);
	const [logo, setLogo] = useState(null);
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		// Comapany data
		c_name: "",
		dba_name: "",
		tax_id: "",
		tax_id_ext: "",
		website: "",
		office: "",
		c_street: "",
		c_suite: "",
		c_city: "",
		c_state: "",
		c_zip: "",
		c_ext: "",
	});
	const {
		// Comapany data
		c_name,
		dba_name,
		tax_id,
		tax_id_ext,
		website,
		office,
		c_street,
		c_suite,
		c_city,
		c_state,
		c_zip,
		c_ext,
	} = userData;
	const onChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		setLogo({
			logo: e.target.files[0],
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const URL_COMPANY = `${process.env.REACT_APP_API_URL}/api/create-firm/${user.firm.id}/`;
		const company_data = JSON.stringify({
			logo,
			c_name,
			dba_name,
			tax_id,
			tax_id_ext,
			website,
			office,
			c_street,
			c_suite,
			c_city,
			c_state,
			c_zip,
			c_ext,
		});
		axios
			.put(URL_COMPANY, company_data, CONFIG)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
								Company Information
							</Typography>
							<TextField
								fullWidth
								size='small'
								margin='normal'
								variant='outlined'
								name='c_name'
								label='Company Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_name'
								autoComplete='c_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='dba_name'
								label='DBA Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='dba_name'
								autoComplete='dba_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='tax_id'
								label='Tax ID #'
								type='text'
								onChange={(e) => onChange(e)}
								id='tax_id'
								autoComplete='tax_id'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='tax_id_ext'
								label='Ext'
								type='text'
								onChange={(e) => onChange(e)}
								id='tax_id_ext'
								autoComplete='tax_id_ext'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size='small'
								margin='normal'
								fullWidth
								variant='outlined'
								name='website'
								label='Website'
								type='text'
								onChange={(e) => onChange(e)}
								id='website'
								autoComplete='website'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='office'
								label='Office'
								type='text'
								onChange={(e) => onChange(e)}
								id='office'
								autoComplete='office'
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_street'
								label='Street'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_street'
								autoComplete='c_street'
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_suite'
								label='Suite'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_suite'
								autoComplete='c_suite'
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_city'
								label='City'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_city'
								autoComplete='c_city'
								sx={{ width: "5rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_state'
								label='State'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_state'
								autoComplete='c_state'
								sx={{ width: "5rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_zip'
								label='Zip'
								type='number'
								onChange={(e) => onChange(e)}
								id='c_zip'
								autoComplete='c_zip'
								sx={{ width: "4rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_ext'
								label='+4'
								type='number'
								onChange={(e) => onChange(e)}
								id='c_ext'
								autoComplete='c_ext'
								sx={{ width: "4rem" }}
							/>
							<br />
							<input
								type='file'
								id='image'
								accept='image/png, image/jpeg'
								onChange={handleImageChange}
							/>
							<Divider />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Fragment>
	);
};

export default CompanyInformation;
