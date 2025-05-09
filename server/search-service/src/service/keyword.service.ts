import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'fs/promises';

export interface KeywordEntry {
  keyword: string;
  link: string;
}

@Injectable()
export class KeywordService implements OnModuleInit {
  private readonly filePath = path.join(__dirname, '..', '..', 'keywords.json');
  private keywordsData: KeywordEntry[] = [];

  async onModuleInit() {
    await this.loadKeywordsFromFile();
  }

  async loadKeywordsFromFile() {
    try {
      const file = await fs.readFile(this.filePath, 'utf-8');
      const { data }: { data: KeywordEntry[] } = JSON.parse(file);
      this.keywordsData = data;
      console.log(`Mots-clés chargés depuis ${this.filePath}`);
    } catch (error) {
      console.error(`Erreur lors de la lecture du fichier ${this.filePath}:`, error);
      this.keywordsData = [];
    }
  }

  async searchKeywords(query: string): Promise<KeywordEntry[]> {
    const lowerQuery = query.toLowerCase();
    return this.keywordsData
      .filter(entry => entry.keyword.toLowerCase().startsWith(lowerQuery))
      .slice(0, 10);
  }
}
