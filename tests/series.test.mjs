import test from 'node:test';
import assert from 'node:assert/strict';
import { groupSeries, findSeries, seriesUrl } from '../utils/series.ts';
const post = (category, series, modifiedAt) => ({ categoryPath: category, seriesPath: series, seriesPublicName: series, modifiedAt: new Date(modifiedAt) });
test('series group by both category and folder with counts and latest modification', () => {
    const groups = groupSeries([post('note','CS','2026-01-01'),post('note','CS','2026-02-01'),post('diary','CS','2026-01-01')]);
    assert.equal(groups.length,2);
    const cs = findSeries(groups,'note','CS');
    assert.equal(cs.count,2);
    assert.equal(cs.modifiedAt.toISOString(),'2026-02-01T00:00:00.000Z');
    assert.equal(findSeries(groups,'note','missing'),undefined);
});
test('series links round trip Korean and percent names and resolve encoded params', () => {
    assert.equal(seriesUrl('일기','100% 여행'),'/series/%EC%9D%BC%EA%B8%B0/100%25%20%EC%97%AC%ED%96%89');
    const groups=groupSeries([post('일기','100% 여행','2026-01-01')]);
    assert.equal(findSeries(groups,encodeURIComponent('일기'),encodeURIComponent('100% 여행')).count,1);
});
