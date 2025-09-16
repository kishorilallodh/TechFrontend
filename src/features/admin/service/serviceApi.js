// src/api/servicesApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Base Axios instance
const api = axios.create({
  baseURL:  `${API_BASE_URL}/api`, 
  withCredentials: true,
});

// ------------ THUNKS ------------

// Get All Services
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/services");
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching services");
    }
  }
);
// Get Service By Slug
export const fetchServiceBySlug = createAsyncThunk(
  "services/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await api.get(`/services/slug/${slug}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching service by slug");
    }
  }
);
// Get Service By ID
export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/services/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching service");
    }
  }
);

// Create Service
export const createService = createAsyncThunk(
  "services/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Service creation failed");
    }
  }
);

// Update Service
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/services/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// Delete Service
export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/services/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

