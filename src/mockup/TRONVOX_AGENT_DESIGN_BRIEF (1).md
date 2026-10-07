# TRONVOX — PREMIUM STREETWEAR E-COMMERCE REDESIGN BRIEF

> **Mục tiêu:** Dùng tài liệu này làm yêu cầu chính cho AI Coding Agent để xây dựng / redesign website **Tronvox** theo đúng tinh thần hình ảnh tham chiếu đã cung cấp.
>
> **Quan trọng:** Không copy nguyên bản layout, code, nội dung hay hình ảnh của bất kỳ thương hiệu nào. Chỉ lấy **cảm hứng về art direction, typography, spacing, editorial composition và premium streetwear experience**.

---

## 1. THÔNG TIN THƯƠNG HIỆU

- **Brand:** TRONVOX
- **Định vị:** Premium / Minimal / Editorial Streetwear
- **Phong cách:** Silent Luxury + Modern Streetwear + Editorial Fashion
- **Mood:** lạnh, tự tin, tối giản, thời trang, có tính nghệ thuật
- **Màu chủ đạo:**
  - Warm White / Off White
  - Blush Pink / Dusty Pink
  - Soft Gray
  - Deep Black / Studio Black
- **Typography:** sans-serif hiện đại, geometric, rộng chữ vừa phải; heading có personality mạnh.
- **Logo:** TRONVOX dạng wordmark uppercase, tracking rộng.
- **Không sử dụng:** gradient rẻ tiền, card bo góc quá nhiều, shadow nặng, glassmorphism, UI kiểu SaaS, template ecommerce phổ thông.

---

# 2. ART DIRECTION TỔNG THỂ

Website phải có cảm giác như một **premium fashion editorial website**, không phải một ecommerce template thông thường.

### Từ khóa thiết kế

```text
Premium
Minimal
Editorial
Streetwear
Silent Luxury
Fashion Campaign
High-end
Raw Concrete
Blush Pink
Architectural
Cinematic
Confident
Intentional
```

### Nguyên tắc

1. **Hình ảnh lớn là nhân vật chính.**
2. Typography phải có cá tính nhưng không làm mất khả năng đọc.
3. Khoảng trắng rộng, layout thoáng.
4. Không cố nhồi quá nhiều nội dung vào viewport.
5. Các section phải có nhịp điệu:
   - sáng → tối
   - ảnh → typography
   - grid → asymmetric
   - full-width → contained
6. Border mảnh, divider tinh tế.
7. Animation nhẹ, chậm và có chủ đích.
8. Hover state phải tinh tế, không lạm dụng.
9. Mobile phải được thiết kế lại hợp lý, không chỉ shrink desktop.
10. Toàn bộ website phải nhất quán về spacing, font, button, border, màu sắc.

---

# 3. HEADER / NAVIGATION

## Reference

Header trong ảnh tham chiếu có:

- nền trắng / off-white
- logo TRONVOX ở bên trái
- navigation nằm giữa
- search + cart ở bên phải
- chiều cao khoảng 72–80px
- border/divider rất nhẹ hoặc gần như không thấy

### Desktop

```text
TRONVOX                NEW IN   SHOP   COLLECTIONS   JOURNAL       SEARCH  CART
```

### Navigation

- NEW IN
- SHOP
- COLLECTIONS
- JOURNAL

### Header requirements

- Sticky header.
- Background gần như opaque.
- Không dùng header quá cao.
- Logo phải nổi bật nhưng không quá lớn.
- Navigation uppercase.
- Letter spacing nhẹ.
- Hover:
  - underline rất mảnh hoặc opacity transition.
- Search icon.
- Shopping bag/cart icon.
- Cart có badge khi có sản phẩm.

### Mobile

- Logo bên trái.
- Cart + menu bên phải.
- Navigation chuyển thành mobile drawer.
- Drawer phải đồng nhất với premium visual language.

---

# 4. HERO SECTION

## Reference chính

Hero phải mang cảm giác **fashion campaign / editorial**, không phải banner ecommerce thông thường.

### Composition

- Full-width image.
- Chiều cao lớn.
- Hình ảnh model chiếm phần lớn viewport.
- Text overlay ở bên trái.
- Có thể dùng dark/transparent overlay rất nhẹ để text đọc được.
- Không crop khuôn mặt/model một cách vô lý.

### Hero copy

Eyebrow:

```text
AW26 — SILENT LUXURY
```

Main headline:

```text
FORM
FOLLOWS
FEELING
```

Headline phải:

- rất lớn
- uppercase
- condensed/geometric feel
- line-height chặt
- mạnh và có tính fashion editorial

Description:

```text
A study in restraint. Blush-toned heavyweight essentials,
engineered for the quiet confident.
```

CTA:

```text
SHOP NOW →
EXPLORE COLLECTION
```

### Hero image

Ưu tiên:

- model fashion
- streetwear
- cinematic photography
- blue sky / concrete / urban environment
- black garments
- editorial composition

### Quan trọng

**Không dùng `object-fit: cover` một cách máy móc nếu làm mất chủ thể chính.**

Nếu ảnh gốc có composition đẹp:

- ưu tiên `object-fit: contain` hoặc background positioning phù hợp
- hoặc dùng `<img>` với layout kiểm soát bằng container
- đảm bảo model, khuôn mặt và outfit không bị crop quá mức.

---

# 5. PROMOTIONAL MARQUEE / INFO BAR

Ngay dưới hero có một thanh màu đen.

Ví dụ:

```text
SHIPPING OVER $200     ✦     NEW AW26 DROP LIVE     ✦
CRAFTED IN TOKYO & MILAN     ✦     500GSM HEAVYWEIGHT FLEECE
```

### Design

- nền black
- chữ blush pink / soft white
- uppercase
- monospace hoặc condensed utility font
- letter spacing rộng
- chạy marquee nhẹ hoặc static tùy implementation

Không làm animation quá nhanh.

---

# 6. SHOP PAGE

## Reference layout

Background:

```text
#FFF5F7
```

hoặc warm blush white.

Header section:

```text
NEW IN

THE SHOP
```

Bên phải:

```text
Search...
Featured ▼
```

### Category tabs

```text
ALL
HOODIES & SWEATS
OUTERWEAR
TEES
PANTS
KNITWEAR
ACCESSORIES
```

### Style

- border 1px
- sharp corners
- active tab nền black + chữ trắng
- inactive tab transparent / cream
- uppercase
- tracking rộng

### Product grid

Desktop:

```text
4 columns
```

Khoảng cách đều và rộng.

Mỗi product card gồm:

- image
- badge
- product name
- color
- price

Ví dụ:

```text
NEW DROP

Heavyweight Blush Oversized Hoodie        $185
Blush Pink
```

### Product image

- aspect ratio thống nhất
- ảnh lớn
- không bo góc hoặc bo cực nhẹ
- hover zoom rất nhẹ
- không zoom quá mạnh

### Badge

Ví dụ:

```text
NEW DROP
LIMITED
STATEMENT
ESSENTIAL
```

Badge nhỏ, trắng, chữ đen.

### Product typography

Tên sản phẩm:

- medium / semibold
- không quá lớn

Color:

- muted gray

Price:

- black
- aligned right

---

# 7. FEATURED COLLECTIONS

## Reference

Section background blush/off-white.

Heading:

```text
FEATURED

COLLECTIONS
```

Layout:

```text
┌──────────────────────┐  ┌──────────────────────┐
│                      │  │                      │
│      LARGE IMAGE     │  │      LARGE IMAGE     │
│                      │  │                      │
│ title                │  │ title                │
│ description          │  │ description          │
│ VIEW PRODUCTS →      │  │ VIEW PRODUCTS →      │
└──────────────────────┘  └──────────────────────┘
```

### Collection examples

```text
DROP 04 — CONCRETE BLOOM
```

Description:

```text
Where soft blush meets raw concrete.
Our most refined heavyweight range yet.
```

Second:

```text
THE QUIET ROSE
```

Description:

```text
A tonal study in pink.
Essentials that whisper instead of shout.
```

### Requirements

- image full card
- dark overlay gradient nhẹ nếu cần
- text nằm trên ảnh ở bottom
- title uppercase
- CTA nhỏ
- hover image scale 1.02–1.04
- transition 500–800ms
- không dùng card shadow

---

# 8. BRAND STORY / MANIFESTO

## Reference

Section nền:

```text
#151515
```

Layout chia 2:

```text
┌─────────────────┬───────────────────────────────┐
│                 │ OUR MANIFESTO                 │
│                 │                               │
│   LARGE IMAGE   │ SOFTNESS IS A                 │
│                 │ FORM OF STRENGTH              │
│                 │                               │
│                 │ paragraph                     │
│                 │ paragraph                     │
│                 │                               │
│                 │ 500       2        100%       │
└─────────────────┴───────────────────────────────┘
```

### Eyebrow

```text
OUR MANIFESTO
```

### Heading

```text
SOFTNESS IS A
FORM OF STRENGTH
```

### Body

```text
Tronvox was born from a single idea — that luxury can be quiet.
We craft heavyweight essentials between the ateliers of Tokyo
and Milan, weaving blush-toned fleece and raw concrete palettes
into pieces made to outlast seasons.

No loud logos. No noise. Just considered materials,
architectural cuts, and the confidence to be understated.
This is silent luxury.
```

### Stats

```text
500
GSM FLEECE

2
ATELIERS

100%
CONSIDERED
```

### Design

- black background
- white typography
- blush pink accents
- large editorial image
- no excessive decorations
- thin divider
- stats arranged horizontally
- mobile chuyển thành vertical

---

# 9. JOURNAL

## Reference

Background:

```text
#FFF5F7
```

Heading:

```text
EDITORIAL

JOURNAL
```

Grid 3 columns.

Each article:

```text
IMAGE

DESIGN DISPATCH  ·  JULY 2026

Drop 04 Manifesto: The Intersection
of Soft Blush & Raw Concrete

How we translated brutalist architecture
into wearable softness for AW26.
```

### Article examples

```text
Drop 04 Manifesto: The Intersection of Soft Blush & Raw Concrete
```

```text
Architectural Craftsmanship: 500GSM Organic Fleece
```

```text
Styling The Quiet Rose: Three Ways To Wear Blush
```

### Requirements

- image ratio consistent
- editorial metadata tiny uppercase
- title clear
- excerpt muted
- no card background
- no heavy border
- hover image scale nhẹ

---

# 10. NEWSLETTER / MEMBERSHIP

## Reference

Background blush pink.

Centered composition.

Eyebrow:

```text
JOIN THE CIRCLE
```

Heading:

```text
EARLY ACCESS TO EVERY DROP
```

Description:

```text
Members-only releases, lookbooks and private sales.
No noise — just the good stuff.
```

Form:

```text
[your@email.com] [SUBSCRIBE]
```

### Design

- large vertical spacing
- centered
- no card
- input + button sharp
- black button
- white input
- responsive mobile

### Success state

Sau khi submit:

```text
YOU'RE IN.
WELCOME TO THE CIRCLE.
```

Không reload page.

---

# 11. FOOTER

## Reference

Footer background black.

Logo:

```text
TRONVOX
```

Description:

```text
Heavyweight essentials crafted between
Tokyo & Milan. Blush pink meets raw
concrete — minimal, premium, intentional.
```

### Footer columns

```text
SHOP
Hoodies & Sweats
Outerwear
Tees
Pants
Knitwear
Accessories
```

```text
SHIPPING
Complimentary worldwide shipping on
orders over $200. Standard delivery 3–6
business days with full tracking.
Express
options at checkout.
```

```text
RETURNS
30-day returns on unworn items with
original tags. Free return labels for
domestic orders. Refunds processed
within 5 business days of receipt.
```

### Social icons

- Instagram
- Facebook
- Email

### Bottom line

```text
© 2026 TRONVOX. SILENT LUXURY STREETWEAR.
```

và:

```text
ALL DESIGNS, IMAGERY AND CONTENT © TRONVOX.
```

---

# 12. PRODUCT DETAIL PAGE

Khi click product phải mở product detail cao cấp.

## Layout desktop

```text
┌──────────────────────────┬──────────────────────────┐
│                          │ PRODUCT NAME             │
│                          │                          │
│     LARGE PRODUCT IMAGE  │ $185                     │
│                          │                          │
│                          │ COLOR                    │
│                          │ Blush Pink               │
│                          │                          │
│                          │ SIZE                     │
│                          │ S  M  L  XL              │
│                          │                          │
│                          │ [ ADD TO BAG ]           │
│                          │                          │
│                          │ MATERIAL                  │
│                          │ SHIPPING & RETURNS        │
└──────────────────────────┴──────────────────────────┘
```

### Requirements

- gallery nhiều ảnh
- thumbnail
- size selector
- color selector
- quantity
- Add to Bag
- material accordion
- shipping & returns accordion
- related products
- breadcrumb tối giản

---

# 13. CART

Cart drawer hoặc cart page phải giữ cùng visual language.

Hiển thị:

- product image
- product name
- selected size
- color
- quantity
- price
- remove
- subtotal

### Shipping progress

Ví dụ:

```text
YOU'RE $35 AWAY FROM COMPLIMENTARY SHIPPING.
```

Progress bar mảnh.

### CTA

```text
CHECKOUT
```

Button black, sharp.

---

# 14. SEARCH

Search UI phải tối giản.

Desktop có thể dùng:

```text
Search...
```

Click vào mở search overlay/drawer.

Hiển thị:

- search input lớn
- suggested searches
- product results
- article results

Không tạo UI quá phức tạp.

---

# 15. ANIMATION

Animation phải **premium và chậm**.

Ưu tiên:

- fade
- fade + translateY
- image scale 1.02
- underline transition
- drawer slide
- modal fade

Timing:

```text
300ms – 800ms
```

Không dùng:

- bounce
- excessive spring
- flashy particles
- parallax quá mạnh
- animation làm chậm shopping experience

---

# 16. RESPONSIVE

## Desktop

- max content width khoảng 1200–1400px
- large whitespace
- 4-column product grid
- 2-column collection
- 2-column manifesto
- 3-column journal

## Tablet

- 2–3 product columns
- collection vẫn 2 columns nếu đủ rộng
- manifesto chuyển phù hợp

## Mobile

- 2-column product grid nếu đủ không gian
- header compact
- mobile menu drawer
- hero typography giảm kích thước
- CTA xếp dọc nếu cần
- collections 1 column
- manifesto 1 column
- journal 1 column
- footer 1 column
- newsletter form xếp dọc

### Quan trọng

Không để:

- horizontal overflow
- text bị cắt
- button quá nhỏ
- ảnh bị crop mất chủ thể
- navigation tràn màn hình

---

# 17. ACCESSIBILITY

Bắt buộc:

- semantic HTML
- alt text cho ảnh
- aria-label cho icon button
- keyboard navigation
- visible focus state
- contrast đủ tốt
- button không chỉ dựa vào màu
- form có label/accessibility
- mobile menu có keyboard close
- modal có focus management

---

# 18. SEO

Cấu hình:

- title
- meta description
- Open Graph
- Twitter card
- canonical nếu phù hợp
- semantic heading hierarchy
- product metadata nếu có thể

Title đề xuất:

```text
Tronvox — Silent Luxury Streetwear
```

Description:

```text
Heavyweight essentials crafted between Tokyo & Milan.
Blush-toned minimal streetwear for the quietly confident.
```

---

# 19. TECHNICAL REQUIREMENTS

## Stack bắt buộc

```text
React
TypeScript
Vite
Tailwind CSS
```

Nếu project hiện tại khác stack, **không phá project một cách không cần thiết**. Hãy kiểm tra cấu trúc hiện tại trước rồi refactor hợp lý.

### Code quality

- component-based
- reusable components
- no duplicated UI
- no hard-coded repeated brand values
- config/data tách khỏi UI
- TypeScript types rõ ràng
- clean imports
- no dead code
- no console errors
- no broken routes

### Suggested structure

```text
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── ProductCard.tsx
│   ├── CollectionCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductDetail.tsx
│   ├── CartDrawer.tsx
│   ├── Newsletter.tsx
│   ├── JournalCard.tsx
│   └── Footer.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── Collections.tsx
│   ├── Journal.tsx
│   └── Product.tsx
│
├── data/
│   ├── products.ts
│   ├── collections.ts
│   └── journal.ts
│
├── context/
│   └── CartContext.tsx
│
├── lib/
│   └── utils.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 20. BRAND CONFIG

Không hard-code brand information trong từng component.

Tạo config/data:

```ts
export const brand = {
  name: "Tronvox",
  slogan: "Silent Luxury Streetwear",
  description:
    "Heavyweight essentials crafted between Tokyo & Milan. Blush pink meets raw concrete — minimal, premium, intentional.",
  instagram: "https://www.instagram.com/tronvox.pdf",
  facebook: "https://www.facebook.com/vo.bich.1709",
  email: "hello@tronvox.com",
};
```

Các product/collection/journal data cũng nên nằm trong data files.

---

# 21. HÌNH ẢNH

Các screenshot/reference đã cung cấp cho agent chỉ dùng để hiểu:

- composition
- tỷ lệ hình
- mood
- spacing
- typography
- visual hierarchy
- art direction

**Không copy hình ảnh từ screenshot.**

Nếu project đã có ảnh:

- giữ ảnh phù hợp
- tối ưu crop
- không thay ảnh tùy tiện nếu chưa cần

Nếu cần ảnh placeholder:

- dùng ảnh fashion/editorial phù hợp
- đảm bảo aspect ratio nhất quán
- lazy loading
- tránh ảnh low quality

---

# 22. MÀU SẮC ĐỀ XUẤT

Tạo design tokens:

```css
--tronvox-white: #FFFFFF;
--tronvox-cream: #FFF9FA;
--tronvox-blush: #F8DDE4;
--tronvox-pink: #E9A5B7;
--tronvox-black: #151515;
--tronvox-gray: #777777;
--tronvox-border: #D8D0D2;
```

Có thể tinh chỉnh nhẹ dựa trên hình ảnh thực tế nhưng phải giữ:

```text
white / blush / black
```

làm core palette.

---

# 23. TYPOGRAPHY

Typography hierarchy:

### Eyebrow

- uppercase
- 11–13px
- tracking rộng
- blush/pink

### Hero

- desktop rất lớn
- 72–120px tùy viewport
- tight line-height
- bold
- uppercase

### Section heading

- 48–72px desktop
- 36–48px mobile

### Body

- 15–18px
- line-height 1.5–1.7

### Utility / metadata

- 10–12px
- uppercase
- letter spacing rộng

Không sử dụng quá nhiều font family.

Tối đa:

```text
1 display font
1 body font
1 optional utility/mono font
```

---

# 24. SPACING

Website phải có breathing room.

Ưu tiên:

```text
8px
16px
24px
32px
48px
64px
96px
128px
```

Các section lớn nên có:

```text
80–140px vertical padding
```

Tùy viewport.

---

# 25. BUTTON SYSTEM

Primary:

```text
BLACK BACKGROUND
WHITE TEXT
SHARP CORNERS
```

Ví dụ:

```text
SHOP NOW →
```

Secondary:

```text
TRANSPARENT
1PX WHITE/BLACK BORDER
```

Hover:

- background transition
- text transition
- arrow translate nhẹ

Không dùng pill button.

---

# 26. PRODUCT CARD SYSTEM

Card không nên giống marketplace.

Không cần:

- rating stars
- review count
- sale badge màu đỏ
- giant Add to Cart button

Thay vào đó:

```text
IMAGE
BADGE
PRODUCT NAME
COLOR
PRICE
```

Click toàn card → Product Detail.

Có thể hiển thị Add to Bag khi hover desktop.

---

# 27. UX FLOW

Flow chính:

```text
HOME
 ↓
SHOP
 ↓
PRODUCT
 ↓
ADD TO BAG
 ↓
CART
 ↓
CHECKOUT
```

Secondary:

```text
HOME
 ↓
COLLECTION
 ↓
FILTER PRODUCTS
 ↓
PRODUCT
```

Journal:

```text
HOME
 ↓
JOURNAL
 ↓
ARTICLE
```

---

# 28. CHECKOUT

Nếu chưa có backend/payment:

**Không giả lập payment thành công.**

Có thể:

- giữ cart client-side
- hiển thị checkout UI
- hoặc redirect đến nền tảng bán hàng được cấu hình trong brand config

Nếu có backend/payment sẵn:

- giữ logic hiện tại
- chỉ redesign UI
- không phá API contract
- kiểm tra environment variables đúng với Vite

### Vite env

Nếu frontend dùng Vite:

```ts
import.meta.env.VITE_BACKEND_URL
```

Không dùng:

```ts
process.env.REACT_APP_BACKEND_URL
```

trừ khi project thực sự chạy bằng Create React App.

---

# 29. IMPORTANT: KIỂM TRA PROJECT HIỆN TẠI TRƯỚC KHI CODE

Agent phải làm theo thứ tự:

### STEP 1

Kiểm tra:

```text
package.json
vite.config.*
tsconfig.json
src/
public/
```

### STEP 2

Xác định project đang dùng:

```text
React + Vite + TypeScript + Tailwind
```

hay stack khác.

### STEP 3

Không rewrite toàn bộ nếu không cần.

### STEP 4

Kiểm tra các component/page hiện tại.

### STEP 5

Refactor theo design brief này.

### STEP 6

Chạy:

```bash
npm install
npm run lint
npm run build
```

Nếu project không có lint script thì không tự tạo lỗi giả; chỉ chạy các script có trong package.json và build thành công.

---

# 30. ACCEPTANCE CRITERIA

Agent chỉ được coi task hoàn thành khi:

### Visual

- [ ] Header giống tinh thần reference
- [ ] Hero có editorial fashion composition
- [ ] Typography premium
- [ ] Blush + white + black palette
- [ ] Shop page 4-column desktop
- [ ] Collection cards lớn
- [ ] Manifesto section dark
- [ ] Journal 3-column
- [ ] Newsletter blush section
- [ ] Footer black
- [ ] Spacing rộng
- [ ] Không có cảm giác template ecommerce thông thường

### UX

- [ ] Navigation hoạt động
- [ ] Search hoạt động
- [ ] Filter hoạt động
- [ ] Product detail hoạt động
- [ ] Add to cart hoạt động
- [ ] Quantity update hoạt động
- [ ] Remove item hoạt động
- [ ] Cart total chính xác
- [ ] Mobile menu hoạt động
- [ ] Newsletter submit có feedback

### Technical

- [ ] TypeScript không có lỗi
- [ ] Build thành công
- [ ] Không có broken import
- [ ] Không có console error
- [ ] Responsive
- [ ] Accessible
- [ ] Images lazy loaded khi phù hợp
- [ ] Không hard-code brand data trong component
- [ ] Không tạo duplicate components không cần thiết

---

# 31. VISUAL QA — BẮT BUỘC

Sau khi code xong, agent phải tự kiểm tra website bằng browser/screenshot nếu môi trường hỗ trợ.

Kiểm tra ít nhất:

```text
Desktop 1440px
Desktop 1280px
Tablet 768px
Mobile 390px
```

Kiểm tra các page:

```text
/
 /shop
 /collections
 /journal
 /product/:id
```

Và kiểm tra:

```text
Header
Hero
Product grid
Collection section
Manifesto
Journal
Newsletter
Footer
Cart
Mobile menu
```

Nếu có vấn đề:

- spacing lệch
- ảnh crop xấu
- text quá nhỏ
- text tràn
- header sai alignment
- mobile overflow
- CTA không rõ
- section quá dày

→ tự sửa trước khi báo hoàn thành.

---

# 32. ƯU TIÊN KHI IMPLEMENT

Thứ tự ưu tiên:

```text
1. Visual hierarchy
2. Typography
3. Image composition
4. Spacing
5. Responsive
6. UX interaction
7. Animation
8. Micro details
```

Không hy sinh layout premium để thêm quá nhiều functionality.

---

# 33. TINH THẦN CUỐI CÙNG

Website cuối cùng phải khiến người dùng có cảm giác:

> **“Đây là một fashion brand cao cấp có art direction riêng.”**

Không được khiến người dùng có cảm giác:

> “Đây là một template Shopify/Tailwind được đổi màu.”

Hãy ưu tiên:

```text
LESS UI
MORE ART DIRECTION

LESS DECORATION
MORE TYPOGRAPHY

LESS CARDS
MORE COMPOSITION

LESS NOISE
MORE CONFIDENCE
```

---

# 34. AGENT INSTRUCTION — COPY / PASTE

Hãy đọc toàn bộ file này trước khi chỉnh sửa code.

**Không bắt đầu bằng việc viết code ngay.**

Trước tiên:

1. Inspect toàn bộ project hiện tại.
2. Xác định framework và cấu trúc.
3. Xác định entry point.
4. Kiểm tra package.json.
5. Kiểm tra các component hiện tại.
6. Kiểm tra assets/images.
7. Xác định những gì có thể tái sử dụng.
8. Sau đó lập kế hoạch refactor ngắn gọn.

Tiếp theo, triển khai website Tronvox theo đúng design brief phía trên.

**Mục tiêu không phải chỉ làm website “đẹp”, mà phải tạo ra một premium fashion storefront có art direction nhất quán.**

Không copy nguyên bản screenshot.

Không thay đổi brand identity ngoài những gì cần thiết để đạt chất lượng visual.

Không tạo UI dư thừa.

Không dùng placeholder text kiểu:

```text
Lorem ipsum
Product 1
Collection A
```

nếu đã có brand/product content phù hợp.

Sau khi hoàn thành:

```bash
npm run build
```

và sửa tất cả build errors.

Nếu có lint:

```bash
npm run lint
```

Cuối cùng báo cáo:

```text
- Files changed
- Main visual changes
- Features implemented
- Build result
- Remaining issues (nếu có)
```

**Do not claim completion until the project builds successfully.**
