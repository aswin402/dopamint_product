# Technical Specification & Data Contracts — CryptoGPT

See complete schema & data contracts in [`onpkg_docs/spec.md`](file:///home/aswin/programming/vscode/celestialabs/dopamint_product/onpkg_docs/spec.md).

### Summary of Contracts
- `Conversation`: `id`, `title`, `isPinned`, `group`, `createdAt`, `iconName`, `model`
- `Message`: `id`, `conversationId`, `role`, `content`, `createdAt`, `status`, `keyPoints`, `thinkingSteps`, `priceSnapshot`, `codeBlocks`, `suggestedFollowUps`, `attachments`
- `CryptoCoin`: `id`, `rank`, `name`, `symbol`, `price`, `change24h`, `marketCap`, `volume24h`, `history24h`, `history7d`
- `MarketOverview`: `totalMarketCap`, `volume24h`, `btcDominance`, `fearAndGreedIndex`
