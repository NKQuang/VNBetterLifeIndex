import HttpClient from "../HttpClient";
import { ResponseGetdistricts } from "./types";

export async function getWBI() {
    try {
        const response = await HttpClient.getMethod("wbi");
        return response?.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function checkLogin() {
    try {
        const response = await HttpClient.getMethod("check-login");
        return response?.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function loginWithAccount(body: any) {
    try {
        const response = await HttpClient.postMethod("login", body);
        return response?.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getDistrictsIndicators() {
    try {
        const response = await HttpClient.getMethod("districts-indicators");
        return response.data as ResponseGetdistricts;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function postDistrictsIndicators(body: any) {
    try {
        const response = await HttpClient.postMethod("submit-indicator-value", body);
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function postRegisterAccount(body: any) {
    try {
        const response = await HttpClient.postMethod("register", body);
        return response?.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

