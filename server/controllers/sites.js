import Site from "../models/Site.js";
import { geocodeAddress } from "../utils/geocoder.js";
import { getWeatherByCoordinates } from "../utils/weather.js";

//export const createSite = async (req, res, next) => {
  //const newSite = new Site(req.body);
  //try {
    //const savedSite = await newSite.save();
    //res.status(200).json(savedSite);
  //} catch (err) {
    //next(err);
  //}
//};

export const createSite = async (req, res, next) => {
  try {
    const { name, location, status, startDate, endDate } = req.body;

    const coordinates = await geocodeAddress(location);
    if (!coordinates) {
      return res.status(400).json({ message: "Invalid location. Unable to geocode." });
    }

    const { latitude, longitude } = coordinates;

    const newSite = new Site({
      name,
      location,
      status,
      startDate,
      endDate,
      latitude,
      longitude
    });

    const savedSite = await newSite.save();
    res.status(200).json(savedSite);
  } catch (err) {
    next(err);
  }
};


export const getSites = async (req, res, next) => {
  try {
    const sites = await Site.find();
    res.status(200).json(sites);
  } catch (err) {
    next(err);
  }
};

export const getSite = async (req, res, next) => {
  try {
    const site = await Site.findById(req.params.id);
    res.status(200).json(site);
  } catch (err) {
    next(err);
  }
};

export const updateSite = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    // If location is being updated, recalculate latitude and longitude
    if (updates.location) {
      const coordinates = await geocodeAddress(updates.location);
      if (!coordinates) {
        return res.status(400).json({ message: "Invalid location. Unable to geocode." });
      }
      updates.latitude = coordinates.latitude;
      updates.longitude = coordinates.longitude;
    }

    const updatedSite = await Site.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.status(200).json(updatedSite);
  } catch (err) {
    next(err);
  }
};

export const deleteSite = async (req, res, next) => {
  try {
    await Site.findByIdAndDelete(req.params.id);
    res.status(200).json("Site has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getSiteWeather = async (req, res, next) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }

    const weather = await getWeatherByCoordinates(site.latitude, site.longitude);
    res.status(200).json({ site: site.name, location: site.location, weather });
  } catch (err) {
    next(err);
  }
};