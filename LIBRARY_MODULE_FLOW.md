# Library Module - User Flow Documentation

## Overview

This document explains how **Content Managers** add library documents (PDFs) and how they appear to **Students** in the library interface.

---

## Part 1: Content Manager - Adding Library Documents

### Step 1: Access Upload Page

1. **Login** as **Content Manager**
2. Navigate to **Library Management** section
3. Open **"Upload Document (PDF)"** page (`LibraryUploadDocument.jsx`)

### Step 2: Fill Document Information

#### Required Fields:

- **Document Name** (`name`)
  - Example: `"Class 10 Science Notes – Chapter 1"`
  - This becomes the title shown to students

- **Make this document free** (Checkbox)
  - ✅ **Checked**: Document is free
    - `priceActual` = `0`
    - `priceDiscounted` = `0`
    - Price validation is **skipped**
  - ❌ **Unchecked**: Document is paid
    - Must enter **Actual Price (₹)** and **Discounted Price (₹)**
    - Both must be > 0

- **Select PDF file** (`pdfFile`)
  - Must be a PDF file
  - Max size: 50MB
  - File is uploaded to **Cloudinary** (folder: `library/documents`)

- **Class** (`class`)
  - Dropdown populated from backend
  - Options: `Class 8`, `Class 9`, `Class 10`, `Class 11`, `Class 12`, `Common`
  - **Can add new class** using the "Add new class" input on the right sidebar

- **Category** (`category`)
  - Dropdown populated from backend
  - Examples: `Physics Notes`, `NEET Guide`, `Chemistry`, etc.
  - **Can add new category** using the "Add new category" input on the right sidebar

#### Optional Fields:

- **Description** (`description`)
  - Brief text explaining what the document contains
  - Shown on the student details page

- **What's Included** (`whatsIncluded`)
  - Multi-line textarea
  - Each line = one bullet point
  - Example:
    ```
    Chapter-wise notes
    Important formulas
    Practice questions
    Summary sheets
    ```
  - Converted to array: `["Chapter-wise notes", "Important formulas", ...]`

- **Additional Information**:
  - **Best For** (`bestFor`): Who should use this document
  - **Prerequisites** (`prerequisites`): Required knowledge/skills
  - **Support** (`support`): Support information or contact details

### Step 3: Submit Upload

When **"Upload PDF"** button is clicked:

1. **Frontend Validation**:
   - Checks all required fields are filled
   - If not free, validates prices > 0
   - Validates PDF file is selected

2. **FormData Creation**:
   ```javascript
   formData.append('pdfFile', selectedFile);
   formData.append('name', name.trim());
   formData.append('priceActual', isFree ? 0 : priceActual);
   formData.append('priceDiscounted', isFree ? 0 : priceDiscounted);
   formData.append('class', selectedClass);
   formData.append('category', selectedCategory);
   formData.append('description', description.trim());
   formData.append('whatsIncluded', JSON.stringify(whatsIncludedArray));
   formData.append('bestFor', bestFor.trim());
   formData.append('prerequisites', prerequisites.trim());
   formData.append('support', support.trim());
   formData.append('icon', 'FileText');
   formData.append('format', 'PDF');
   ```

3. **API Call**:
   - `POST /api/content/upload-library-document`
   - Headers: `Content-Type: multipart/form-data`

### Step 4: Backend Processing

**Backend** (`contentController.uploadLibraryDocument`):

1. **Validates** required fields
2. **Uploads PDF to Cloudinary**:
   - Uses `multer` memory storage
   - Folder: `library/documents`
   - Resource type: `raw` (for PDFs)
   - Returns: `secure_url`, `bytes`, `public_id`

3. **Creates Database Record**:
   ```javascript
   {
     name: "Class 10 Science Notes",
     price: { actual: 0, discounted: 0 },  // or paid values
     fileUrl: "https://cloudinary.com/...",  // Cloudinary URL
     fileName: "science-notes.pdf",
     fileSize: 2048576,  // bytes
     class: "Class 10",
     category: "Science Notes",
     description: "...",
     whatsIncluded: ["Chapter-wise notes", "..."],
     additionalInfo: {
       bestFor: "...",
       prerequisites: "...",
       support: "..."
     },
     icon: "FileText",
     format: "PDF",
     isActive: true,
     downloads: 0
   }
   ```

4. **Returns Success Response**:
   ```json
   {
     "success": true,
     "message": "Library document uploaded successfully to Cloudinary",
     "document": { ... }
   }
   ```

---

## Part 2: Student Frontend - How Documents Appear

### Step 1: Fetching Documents

**Student Library Page** (`LibraryPage.jsx`):

1. **On Component Mount**:
   - Calls `GET /api/student/library-documents`
   - Backend returns: `{ success: true, documents: [...] }`
   - All documents have `isActive: true`

2. **Organizes Documents** by Class and Category:

   The `organizeDocuments()` function groups documents into:

   - **NCERT & School Books** (`ncert`):
     - `class8`, `class9`, `class10`, `class11`, `class12`
     - **Logic**: Checks if `doc.class` contains `"Class 8"`, `"Class 9"`, etc.

   - **Competitive Exams** (`competitive`):
     - `jee`, `neet`, `upsc`
     - **Logic**: Checks if `doc.category` contains:
       - `"jee"` or `"engineering"` → `jee`
       - `"neet"` or `"medical"` → `neet`
       - `"upsc"` or `"civil"` → `upsc`

   - **Professional Skills** (`professional`):
     - `webdev`, `data`, `ai`
     - **Logic**: Checks if `doc.category` contains:
       - `"web"`, `"frontend"`, `"backend"` → `webdev`
       - `"data"`, `"analytics"` → `data`
       - `"ai"`, `"machine learning"`, `"ml"` → `ai`

   - **Study Materials & Notes** (`study`):
     - `notes`, `guides`
     - **Logic**: Checks if `doc.category` contains:
       - `"note"` or `"study"` → `notes` (appears under "Study Notes")
       - `"guide"` or `"preparation"` → `guides` (appears under "Exam Guides")

### Step 2: Display in Library Page

**Left Sidebar** shows:

- **Main Categories**:
  - NCERT & School Books
  - Competitive Exams
  - Professional Skills
  - Study Materials & Notes

- **Sub-categories** (expandable):
  - Under NCERT: Class 8, Class 9, Class 10, Class 11, Class 12
  - Under Competitive: JEE Preparation, NEET Preparation, UPSC
  - Under Professional: Web Development, Data Science, AI & ML
  - Under Study: Study Notes, Exam Guides

- **Document Count** shown next to each category/sub-category

**Right Content Area** shows:

- **When main category selected**: Grid of sub-category folder cards
- **When sub-category selected**: Grid of document cards showing:
  - Document icon
  - Title
  - Category/subtitle
  - File size
  - Price badge (Free = green, Paid = orange)

### Step 3: Document Details Page

**When student clicks a document**:

1. **Navigation**: `navigate("/library/details/" + documentId)`

2. **Details Page** (`LibraryDetailsPage.jsx`):
   - Fetches: `GET /api/student/library-documents/:id`
   - Maps backend data to UI format

3. **Displays**:
   - **Left Column**:
     - Category badge
     - Document title
     - Description (with fallback if empty)
     - "What's Included" section (list with checkmarks)
     - "Additional Information" section (Best For, Prerequisites, Support)
   
   - **Right Column**:
     - Document icon
     - "Free Resource" badge (if free)
     - **Download Free** button (if free) - triggers download
     - **Buy Now** button (if paid) - shows price
     - File metadata (Size, Format, Category, Downloads)

4. **Download Functionality** (Free Documents):
   - `handleDownload()` function:
     - Fetches PDF from Cloudinary URL (`fileUrl`)
     - Creates blob
     - Triggers browser download with original filename

---

## Category Naming Guide

To ensure documents appear in the correct sections:

### For "Study Notes" Section:
- Category name should contain: `"note"` or `"study"`
- Examples: `"Physics Notes"`, `"Class 10 Study Material"`, `"Chemistry Notes"`

### For "Exam Guides" Section:
- Category name should contain: `"guide"` or `"preparation"`
- Examples: `"NEET Guide"`, `"JEE Preparation"`, `"UPSC Preparation Guide"`

### For Competitive Exams:
- **JEE**: Category contains `"jee"` or `"engineering"`
- **NEET**: Category contains `"neet"` or `"medical"`
- **UPSC**: Category contains `"upsc"` or `"civil"`

### For Professional Skills:
- **Web Dev**: Category contains `"web"`, `"frontend"`, or `"backend"`
- **Data Science**: Category contains `"data"` or `"analytics"`
- **AI/ML**: Category contains `"ai"`, `"machine learning"`, or `"ml"`

### For NCERT Classes:
- Class field should be: `"Class 8"`, `"Class 9"`, `"Class 10"`, `"Class 11"`, `"Class 12"`, or `"Common"`

---

## Data Flow Summary

```
Content Manager Upload Flow:
┌─────────────────────────────────┐
│ 1. Fill Form (LibraryUpload)    │
│    - Name, Prices, PDF          │
│    - Class, Category            │
│    - Description, Metadata      │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 2. POST /upload-library-document│
│    (FormData with file)         │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 3. Backend: Upload to Cloudinary│
│    - Store PDF in cloud         │
│    - Get secure_url             │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 4. Backend: Save to Database    │
│    - LibraryDocument model      │
│    - All metadata fields        │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 5. Document Available for       │
│    Students (isActive: true)    │
└─────────────────────────────────┘

Student View Flow:
┌─────────────────────────────────┐
│ 1. LibraryPage loads            │
│    - GET /library-documents     │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 2. Organize by Class/Category  │
│    - Group into NCERT/Comp/etc   │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 3. Display in Sidebar + Grid    │
│    - Categories with counts     │
│    - Document cards              │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 4. Click Document → Details     │
│    - GET /library-documents/:id │
│    - Show full metadata          │
│    - Download button (if free)  │
└─────────────────────────────────┘
```

---

## Key Files Reference

### Backend:
- **Model**: `Genai-backend/models/libraryModel.js`
- **Controller (Content)**: `Genai-backend/controllers/contentController.js` → `uploadLibraryDocument`
- **Controller (Student)**: `Genai-backend/controllers/studentController.js` → `getLibraryDocumentsForStudent`, `getLibraryDocumentByIdForStudent`
- **Routes**: `Genai-backend/routes/contentRoute.js`, `Genai-backend/routes/studentRoute.js`

### Frontend:
- **Upload Form**: `Genai-frontend/src/pages/contentManager/pages/library/LibraryUploadDocument.jsx`
- **Student Listing**: `Genai-frontend/src/pages/student/library/LibraryPage.jsx`
- **Student Details**: `Genai-frontend/src/pages/student/library/new/LibraryDetailsPage.jsx`
- **API Constants**: `Genai-frontend/src/constants/ApiConstants.jsx`

---

## Important Notes

1. **Free vs Paid**: Documents with `price.discounted === 0` are considered free and can be downloaded directly.

2. **Organization Logic**: The student library page uses **keyword matching** on `class` and `category` fields to organize documents. Ensure category names contain the right keywords.

3. **Cloudinary Storage**: All PDFs are stored in Cloudinary (not local server). The `fileUrl` in the database points to the Cloudinary CDN URL.

4. **Dynamic Categories/Classes**: Content managers can add new categories and classes on-the-fly. These are stored in separate models (`LibraryCategory`, `LibraryClass`) and fetched dynamically.

5. **Fallback Content**: If description, whatsIncluded, or additionalInfo are missing, the student details page shows default static content to ensure a good user experience.
