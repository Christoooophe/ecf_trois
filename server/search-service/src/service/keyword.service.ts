import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface KeywordEntry {
  keyword: string;
  link: string;
}

@Injectable()
export class KeywordService {
  private readonly apiUrl = process.env.API_URL || 'http://common-data-service:8082/search-suggestion-list';

  constructor(private readonly http: HttpService) {}

  private async fetchKeywordsFromApi(): Promise<KeywordEntry[]> {
    try {
      const response = await firstValueFrom(this.http.get(this.apiUrl));
      const productKeywords: string[] = response.data.productKeywords ?? [];

      return productKeywords.map(keyword => ({
        keyword,
        link: `category=${keyword.split(' ')[0].toLowerCase()}`,
      }));
    } catch (error) {
      console.error(`Erreur lors de la récupération des mots-clés depuis l'API:`, error);
      throw new Error('Erreur de récupération des mots-clés');
    }
  }

  async searchKeywords(query: string): Promise<KeywordEntry[]> {
    const lowerQuery = query.toLowerCase();

    const keywords = await this.fetchKeywordsFromApi();

    return keywords
      .filter(entry => entry.keyword.toLowerCase().startsWith(lowerQuery))
      .slice(0, 10);
  }
}
