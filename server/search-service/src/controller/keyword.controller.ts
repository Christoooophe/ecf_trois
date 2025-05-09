import { Controller, Get, Query } from '@nestjs/common';
import { KeywordService } from '../service/keyword.service';

@Controller('search-suggestion')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  async getSuggestions(@Query('q') q: string) {
    if (!q || q.length < 1) return [];
    return this.keywordService.searchKeywords(q);
  }
}
