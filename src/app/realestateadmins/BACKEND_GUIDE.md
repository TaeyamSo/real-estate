# Real Estate Admin Backend Guide

This guide defines the backend contract for the admin route `/realestateadmins`.

## Goals
- Persist all admin-edited content currently managed in static UI state.
- Keep the current admin UX and validation behavior.
- Support future media upload while preserving URL-based fallback.

## Current Frontend Behavior
- Route is gated with a temporary password and client-side session state.
- Each admin section keeps local form state.
- Save buttons currently trigger success toasts only (no persistence).
- Expected sections:
  - hero
  - about
  - residents
  - owners
  - reviews
  - footer
  - units

## Suggested API Design
Base path: `/api/admin`

### 1) Read full content
- Method: `GET`
- Path: `/api/admin/content`
- Response: full content document (all sections).

### 2) Upsert one section
- Method: `PUT`
- Path: `/api/admin/content/:section`
- Params: `section` in {hero, about, residents, owners, reviews, footer, units}
- Body: section payload
- Response: saved section payload + metadata

### 3) Export content snapshot
- Method: `GET`
- Path: `/api/admin/export`
- Response: downloadable JSON snapshot for backup/migration.

### 4) Auth endpoints (replace temporary password)
- Method: `POST`
- Path: `/api/admin/auth/login`
- Body: `{ email, password }` or `{ username, password }`
- Response: access token (httpOnly cookie preferred)

- Method: `POST`
- Path: `/api/admin/auth/logout`
- Response: success

- Method: `GET`
- Path: `/api/admin/auth/me`
- Response: current admin profile/session status

## Suggested Data Model
Single-document model is simplest initially.

```json
{
  "hero": {
    "badge": "string",
    "heading1": "string",
    "heading2": "string",
    "tagline": "string",
    "backgroundMedia": { "url": "string", "type": "image|video|youtube" }
  },
  "about": {
    "badge": "string",
    "heading": "string",
    "paragraph1": "string",
    "paragraph2": "string",
    "image": { "url": "string", "type": "image|video|youtube" },
    "stats": [
      { "value": "string", "label": "string" },
      { "value": "string", "label": "string" },
      { "value": "string", "label": "string" }
    ]
  },
  "residents": {
    "chapter": {},
    "section": {}
  },
  "owners": {
    "chapter": {},
    "section": {}
  },
  "reviews": [
    {
      "id": "string",
      "name": "string",
      "role": "string",
      "rating": 1,
      "text": "string"
    }
  ],
  "footer": {
    "brandDescription": "string",
    "contactAddress": "string",
    "contactPhone": "string",
    "contactEmail": "string",
    "serviceAreas": ["string"],
    "socialLinks": [
      { "id": "string", "platform": "facebook|instagram|x|linkedin|youtube|tiktok|google|other", "url": "string" }
    ]
  },
  "units": [
    {
      "id": "string",
      "city": "string",
      "price": 0,
      "beds": 0,
      "baths": 0,
      "sqft": 0,
      "address": "string",
      "available": "string",
      "imageUrl": "string",
      "images": ["string"],
      "listingUrl": "string",
      "status": "Available|Coming Soon",
      "description": "string"
    }
  ],
  "meta": {
    "version": 1,
    "updatedAt": "ISO_DATE",
    "updatedBy": "string"
  }
}
```

## Validation Rules (mirror frontend)
- URL fields: valid URL format.
- Reviews: rating from 1 to 5; text length 20-300.
- Units: `price > 0`; `beds/baths/sqft` positive integers.
- Text max lengths should match frontend limits to avoid drift.

## Security Requirements
- Replace temporary password with server auth.
- Use httpOnly secure cookies for session tokens.
- Enforce role-based access: `admin` only.
- Add rate limiting to auth endpoints.
- Log all mutations with actor and timestamp.

## Versioning Strategy
- Include `meta.version` in content.
- For breaking schema changes, migrate existing document and keep a migration log.

## Recommended Implementation Steps
1. Add `GET /api/admin/content` and wire admin initial load.
2. Add `PUT /api/admin/content/:section` and wire each Save action.
3. Add auth endpoints and replace client-only password gate.
4. Add export endpoint for snapshots.
5. Add audit logging and optional draft/publish workflow.

## Frontend Integration Notes
- Keep section-level save calls to minimize payload size.
- Keep toast UX: success/error based on API responses.
- During save, disable save button and show a loading state.
- On load failure, show retry UI with non-blocking toast.

## Nice-to-Have (Later)
- Media upload endpoint and storage (S3/R2/etc.) with signed URLs.
- Revision history and rollback.
- Multi-admin conflict handling (optimistic locking with `updatedAt`/`etag`).
