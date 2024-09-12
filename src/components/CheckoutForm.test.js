import React from "react";
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

const getFormInputs = (screen) => {
	const firstName = screen.queryByLabelText(/first name/i);
	const lastName = screen.queryByLabelText(/last name/i);
	const address = screen.queryByLabelText(/address/i);
	const city = screen.queryByLabelText(/city/i);
	const state = screen.queryByLabelText(/state/i);
	const zip = screen.queryByLabelText(/zip/i);
	const submit = screen.queryByRole("button");

	return { firstName, lastName, address, city, state, zip, submit };
}

test("form header renders", () => {
	render(<CheckoutForm />);

	const header = screen.getByText(/checkout form/i);

	expect(header).toBeInTheDocument();
	expect(header).toBeVisible();
});

test("getFormInputs helper form returns correct elements", () => {
	render(<CheckoutForm />);
	const form = getFormInputs(screen);

	expect(form.firstName).toBeInTheDocument();
	expect(form.lastName).toBeInTheDocument();
	expect(form.address).toBeInTheDocument();
	expect(form.city).toBeInTheDocument();
	expect(form.state).toBeInTheDocument();
	expect(form.zip).toBeInTheDocument();
	expect(form.submit).toBeInTheDocument();
})

test("form shows success message on submit with form details", async () => {
	render(<CheckoutForm />);
	const form = getFormInputs(screen);

	await userEvent.type(form.firstName, "Joe");
	await userEvent.type(form.lastName, "Calderon");
	await userEvent.type(form.address, "1 First St");
	await userEvent.type(form.city, "Cityville");
	await userEvent.type(form.state, "Nebraska");
	await userEvent.type(form.zip, "65000");
	userEvent.click(form.submit);

	const successMessage = screen.queryByText(/you have ordered some plants/i);
	expect(successMessage).toBeInTheDocument();
	expect(successMessage).toBeVisible();

	const successName = screen.queryByText(/joe calderon/i);
	expect(successName).toBeInTheDocument();
	expect(successName).toBeVisible();

	const successAddress = screen.queryByText(/1 first st/i);
	expect(successAddress).toBeInTheDocument();
	expect(successAddress).toBeVisible();

	const successArea = screen.queryByText(/cityville, nebraska 65000/i);
	expect(successArea).toBeInTheDocument();
	expect(successArea).toBeVisible();
});
