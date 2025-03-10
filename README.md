# Art Gallery Management System

## Description
The **Art Gallery Management System** is a web application that enables gallery administrators to manage and display artworks in a virtual gallery. Users can browse, filter, and sort through various artworks, while administrators can add or remove artwork listings.

## Application Overview
The project consists of two main parts:
- **Frontend**: A single-page application (SPA) for managing and displaying artworks.
- **Backend**: A Web API to handle artwork data management.

Implementing either part is sufficient for a working system, but completing both is encouraged.

## Frontend

### Technologies Used
- **Language**: TypeScript
- **Framework/Library**: React
- **Data Storage**: Backend API

### Features
1. **View Art Listings**: Users can browse a list of available artworks with details such as title, artist, type, price, and availability.
2. **Sorting and Filtering Options**:
   - Sort by price (lowest to highest, highest to lowest).
   - Filter by artist and artwork type.
3. **Add New Artwork**:
   - Form to add new artwork with the following fields:
     - **Title** (required, max 99 characters)
     - **Artist** (required)
     - **Type** (predefined values, e.g., painting, sculpture)
     - **Price** (numeric, must be positive)
     - **Availability** (boolean, indicates whether the artwork is for sale or exhibition only)
4. **Delete Artwork**: Each artwork entry includes a delete button for removal.
5. **Gallery State Persistence**: The first four artworks are displayed on application launch, and state is preserved using LocalStorage or API.

### Artwork Model
```json
{
  "id": "string",
  "title": "string",
  "artist": "string",
  "type": "string",
  "price": "number",
  "availability": "boolean"
}
```

## Backend

### Technologies Used
- **Language**: TypeScript
- **Framework**: NestJS
- **Database**: MongoDB
- **ORM (Optional)**: Mongoose

### Features
1. **Retrieve Artworks**
   - **GET /artworks**: Fetch all artwork entries with sorting and filtering options.
   - **GET /artworks/{id}**: Retrieve details of a specific artwork by ID.
2. **Add New Artwork**
   - **POST /artworks**: Add a new artwork with validation rules:
     - **Title**: Required, max 99 characters.
     - **Artist**: Required, max 50 characters.
     - **Type**: Required, predefined values (e.g., painting, sculpture).
     - **Price**: Required, positive number.
     - **Availability**: Optional boolean.
3. **Delete Artwork**
   - **DELETE /artworks/{id}**: Remove a specific artwork entry by ID.
4. **Update Existing Artwork (Optional)**
   - **PUT /artworks/{id}**: Modify an existing artwork with the same validation rules as the **POST** request.

### API Endpoints
#### Retrieve All Artworks
```
GET /artworks?price=asc&artist=Picasso&type=painting
```
#### Retrieve a Specific Artwork
```
GET /artworks/{id}
Example: GET /artworks/3
```
#### Delete an Artwork
```
DELETE /artworks/{id}
```
#### Add New Artwork
```
POST /artworks
Body:
{
  "title": "Sunset Over the Ocean",
  "artist": "Claude Monet",
  "type": "painting",
  "price": 4500,
  "availability": true
}
```
#### Update an Existing Artwork (Optional)
```
PUT /artworks/{id}
Body: Same as POST request
```

### Error Handling
If a request does not meet validation rules, a **400 Bad Request** response should be returned.

---
This **Art Gallery Management System** provides a flexible and scalable way to manage artwork collections in a virtual gallery environment. It ensures a seamless user experience while maintaining structured backend support for CRUD operations.

