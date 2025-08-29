# HouseConnect - Technical Product Design Document

## App Structure

### Core Screens
1. **Onboarding Flow**
   - Welcome/Splash Screen
   - Role Selection (Tenant/Agent/Owner)
   - Account Setup
   - Profile Creation
   - Verification Process

2. **Authentication**
   - Login Screen
   - Registration Screen
   - Password Reset
   - Phone/Email Verification

3. **Main Application**
   - Home Feed
   - Property Search & Discovery
   - Property Details
   - Roommate Matching
   - Chat & Messaging
   - Profile Management
   - Facility Management
   - Notifications

4. **Role-Specific Dashboards**
   - Agent Dashboard
   - Owner Dashboard
   - Admin Panel

5. **Supporting Screens**
   - Settings
   - Help & Support
   - Legal/Terms
   - Payment Integration

---

## Screen Wireframe Descriptions

### 1. Onboarding Flow

#### Welcome/Splash Screen
**Layout:**
- Full-screen gradient background (Nigerian flag colors: green to white)
- Centered HouseConnect logo (city skyline)
- Animated floating property icons
- Bottom action area

**Components:**
- Large logo with subtle animation
- Tagline: "Connect. Live. Thrive."
- "Get Started" primary button (rounded, elevated)
- "Already have an account?" link

**Behaviors:**
- Auto-advance after 3 seconds or user tap
- Smooth fade transitions
- Floating icons gentle movement

#### Role Selection Screen
**Layout:**
- Header with back button and progress indicator
- Three large role cards in vertical stack
- Footer with continue button

**Components:**
- Role cards with icons, titles, descriptions
- Radio button selection
- Animated card highlighting on selection
- Progress bar (step 1 of 4)

**Behaviors:**
- Card selection with smooth animation
- Continue button enables after selection
- Role-specific onboarding flow branches

### 2. Home Feed

#### Layout Structure
**Header:**
- HouseConnect logo (left)
- Location selector with dropdown
- Notification bell with badge
- Profile avatar (right)

**Body:**
- Sticky tab navigation (Properties, Roommates, Facilities)
- Content area with infinite scroll
- Floating action button (bottom right)

**Footer:**
- Bottom navigation (5 tabs: Home, Search, Match, Chat, Profile)

#### Components
- **Property Cards:** Image carousel, price, location, quick stats, heart icon
- **Roommate Cards:** Profile photo, name, age, interests tags, compatibility score
- **Facility Cards:** Service type, provider info, rating, book button
- **Safe Mode Toggle:** Floating pill at top of feed
- **Filter Chips:** Horizontal scrollable filter options

#### Behaviors
- Pull-to-refresh on feed
- Infinite scroll loading
- Card tap → detail view
- Heart tap → save/unsave animation
- Safe Mode toggle → content filtering
- Swipe left/right on roommate cards → like/pass

### 3. Property Search & Discovery

#### Layout
**Header:**
- Search bar with location and filters
- Map/List toggle button
- Filter button with badge count

**Body (List View):**
- Property cards in vertical list
- Sticky filter chips
- Load more on scroll

**Body (Map View):**
- Full-screen map with property pins
- Bottom sheet with property preview
- Cluster markers for multiple properties

#### Components
- **Search Bar:** Auto-complete, recent searches, voice input
- **Filter Modal:** Price range, property type, amenities, distance
- **Property Pins:** Color-coded by price range
- **Bottom Sheet:** Draggable, property preview cards

#### Behaviors
- Real-time search suggestions
- Map pin clustering/expansion
- Bottom sheet drag interactions
- Filter application with smooth transitions

### 4. Property Details

#### Layout
**Header:**
- Image carousel with indicators
- Back button and share/save icons
- Floating price tag

**Body:**
- Property info section
- Amenities grid
- Location map
- Reviews section
- Similar properties
- Contact/Book section

#### Components
- **Image Carousel:** Full-width, swipeable, zoom capability
- **Info Cards:** Price, size, type, availability
- **Amenities Grid:** Icon + label pairs
- **Review Cards:** User avatar, rating, comment, date
- **Action Buttons:** Contact Agent, Schedule Tour, Apply

#### Behaviors
- Image carousel with smooth transitions
- Expandable description text
- Map interaction (zoom, pan)
- Review pagination
- Contact form modal

### 5. Roommate Matching

#### Layout (Mobile - Tinder-style)
**Header:**
- Safe Mode toggle
- Filter button
- Match count indicator

**Body:**
- Full-screen profile cards
- Swipe area with action hints
- Bottom action buttons

#### Layout (Desktop - Grid)
**Header:**
- Search and filter controls
- Grid/card view toggle

**Body:**
- Profile cards in responsive grid
- Pagination controls

#### Components
- **Profile Cards:** Large photo, name, age, bio, interests, lifestyle tags
- **Action Buttons:** Pass (X), Like (Heart), Super Like (Star)
- **Match Modal:** Celebration animation, chat button
- **Filter Panel:** Age range, interests, lifestyle, distance

#### Behaviors
- Swipe gestures (mobile)
- Card stack animation
- Match celebration with confetti
- Filter application with card refresh

### 6. Chat & Messaging

#### Layout
**Header:**
- Back button
- Contact name and status
- Video call, voice call, info buttons

**Body:**
- Message list with timestamps
- Message input area
- Attachment options

#### Components
- **Message Bubbles:** Sent (right, blue), received (left, gray)
- **Timestamp Labels:** Grouped by time periods
- **Input Bar:** Text field, emoji, attachment, send buttons
- **Attachment Modal:** Camera, gallery, documents, location

#### Behaviors
- Auto-scroll to latest message
- Typing indicators
- Message status indicators (sent, delivered, read)
- Image/document preview

### 7. Facility Management

#### Layout
**Header:**
- Service category tabs
- Search bar
- Filter button

**Body:**
- Service provider cards
- Request history
- Quick actions

#### Components
- **Service Cards:** Provider photo, name, rating, services, price range
- **Request Cards:** Service type, date, status, provider info
- **Quick Action Buttons:** Emergency repair, cleaning, maintenance
- **Booking Modal:** Service selection, date/time picker, notes

#### Behaviors
- Category filtering
- Service booking flow
- Request status tracking
- Provider rating system

---

## Navigation Flow

### Primary Navigation (Bottom Tabs)
1. **Home** → Feed with properties, roommates, facilities
2. **Search** → Advanced search and filters
3. **Match** → Roommate matching interface
4. **Chat** → Message conversations
5. **Profile** → User profile and settings

### Secondary Navigation
- **Deep Links:** Property details, roommate profiles, chat conversations
- **Modal Overlays:** Filters, booking forms, image viewers
- **Side Menu:** Settings, help, legal (accessible from profile)

### User Flow Examples
1. **Property Search:** Home → Search → Filters → Property List → Property Details → Contact Agent
2. **Roommate Matching:** Home → Match → Swipe Cards → Match → Chat
3. **Facility Booking:** Home → Facilities → Service Provider → Book Service → Confirmation

---

## User Roles & Views

### Tenant View
- **Home Feed:** Properties, roommates, facilities
- **Profile:** Personal info, preferences, verification status
- **Restrictions:** Cannot list properties, limited facility access

### Agent View
- **Dashboard:** Property listings, inquiries, performance metrics
- **Tools:** Bulk upload, analytics, lead management
- **Profile:** Professional verification, portfolio showcase

### Owner View
- **Dashboard:** Property management, tenant communications, maintenance
- **Privacy:** Not visible in public roommate matching
- **Tools:** Rent collection, expense tracking, tenant screening

### Admin View
- **Control Panel:** User management, content moderation, system settings
- **Analytics:** Platform usage, revenue metrics, user behavior
- **Tools:** Verification management, dispute resolution

---

## Interaction Patterns

### Swipe-Based Matching
- **Cards:** Full-screen profile cards with smooth animations
- **Gestures:** Swipe right (like), left (pass), up (super like)
- **Feedback:** Visual hints, haptic feedback, card rotation
- **Actions:** Bottom buttons for non-swipe users

### Map + List Toggle
- **Toggle Button:** Animated switch between views
- **State Persistence:** Remember user preference
- **Smooth Transitions:** Fade between map and list
- **Data Sync:** Consistent results across views

### Safe Mode Toggle
- **Visual Indicator:** Floating pill with shield icon
- **Content Filtering:** Show only verified users/properties
- **State Indication:** Clear visual difference when active
- **Quick Access:** Always visible during browsing

### Floating Action Button
- **Context Aware:** Changes based on current screen
- **Actions:** Add property, create request, start chat
- **Animation:** Smooth expand/collapse with options
- **Positioning:** Bottom right, above navigation

### In-App Chat Design
- **Message Bubbles:** Rounded corners, color-coded by sender
- **Timestamps:** Grouped and minimally intrusive
- **Media Sharing:** Image thumbnails, document previews
- **Status Indicators:** Sent, delivered, read states

---

## Visual Style

### Color Palette
**Primary Colors:**
- Nigerian Green: #008751 (primary actions, success states)
- Clean White: #FFFFFF (backgrounds, cards)
- Charcoal: #2D3748 (text, icons)

**Secondary Colors:**
- Warm Gold: #F6AD55 (accents, highlights)
- Sky Blue: #4299E1 (links, info states)
- Soft Gray: #F7FAFC (backgrounds, disabled states)

**Status Colors:**
- Success: #48BB78
- Warning: #ED8936
- Error: #F56565
- Info: #4299E1

### Typography
**Primary Font:** Inter (clean, modern, excellent readability)
**Hierarchy:**
- H1: 32px, Bold (page titles)
- H2: 24px, SemiBold (section headers)
- H3: 20px, Medium (card titles)
- Body: 16px, Regular (main content)
- Caption: 14px, Regular (metadata)

### Component Styling
**Cards:**
- Rounded corners (12px radius)
- Subtle shadows (0 2px 8px rgba(0,0,0,0.1))
- White background with border

**Buttons:**
- Primary: Green background, white text, rounded
- Secondary: White background, green border, green text
- Floating: Circular, elevated shadow, icon-only

**Inputs:**
- Rounded borders (8px radius)
- Focus states with green accent
- Placeholder text in gray

### Animation & Interactions
**Micro-interactions:**
- Button press feedback (scale down slightly)
- Card hover effects (subtle lift)
- Loading states with skeleton screens
- Success animations (checkmarks, confetti)

**Page Transitions:**
- Smooth slide animations between screens
- Modal overlays with backdrop blur
- Tab switching with horizontal slide

### Nigerian Cultural Elements
**Visual Touches:**
- Subtle geometric patterns inspired by traditional textiles
- Color combinations reflecting Nigerian flag
- Local imagery in onboarding and empty states
- Currency formatting (₦) throughout the app

### Responsive Design
**Mobile-First Approach:**
- Touch-friendly button sizes (44px minimum)
- Thumb-reachable navigation
- Swipe gestures for primary actions
- Optimized for one-handed use

**Desktop Adaptations:**
- Grid layouts for property/roommate browsing
- Sidebar navigation for complex flows
- Hover states and keyboard shortcuts
- Multi-column layouts for efficiency

---

## Technical Implementation Notes

### State Management
- User authentication state
- Property/roommate filters and preferences
- Chat message synchronization
- Offline data caching

### Performance Considerations
- Image lazy loading and optimization
- Infinite scroll with virtual scrolling
- Map clustering for performance
- Background sync for messages

### Accessibility
- Screen reader support
- High contrast mode compatibility
- Keyboard navigation
- Voice input capabilities

### Platform-Specific Features
- Push notifications for matches and messages
- Deep linking for shared properties
- Camera integration for profile photos
- Location services for nearby searches

This technical design document provides a comprehensive blueprint for building HouseConnect's frontend, with detailed specifications that can be implemented by development teams or fed into AI tools for automated development.
